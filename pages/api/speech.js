import { chunkSpeechText } from "../../lib/speechChunks";
import { sanitizeSpeechText } from "../../lib/sanitizeSpeechText";

const GROQ_SPEECH_URL = "https://api.groq.com/openai/v1/audio/speech";

const DEFAULT_TTS_MODEL = "canopylabs/orpheus-v1-english";
// Male US Orpheus voices — austin (conversational), troy, daniel
const DEFAULT_TTS_VOICE = "austin";
const ALLOWED_VOICES = new Set([
	"autumn",
	"diana",
	"hannah",
	"austin",
	"daniel",
	"troy",
]);

function groqErrorMessage(status, detail) {
	try {
		const parsed = JSON.parse(detail);
		const code = parsed?.error?.code;
		if (code === "model_terms_required") {
			return {
				error:
					"Orpheus TTS needs model terms accepted in Groq Console. Open the Orpheus model in the playground and accept the terms, then try again.",
				code,
			};
		}
		if (parsed?.error?.message) {
			return { error: parsed.error.message, code };
		}
	} catch {
		// ignore parse errors
	}
	return {
		error: "Speech synthesis failed. Try again in a moment.",
		code: status === 400 ? "tts_bad_request" : "tts_upstream_error",
	};
}

/** Orpheus: no bracket tags = natural conversation (per Groq docs). */
function prepareOrpheusInput(text) {
	return (text || "").trim();
}

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const apiKey = process.env.GROQ_API_KEY;
	if (!apiKey) {
		return res.status(503).json({
			error: "Voice synthesis is not configured. Add GROQ_API_KEY to your environment.",
			code: "missing_groq_key",
		});
	}

	const { text } = req.body ?? {};
	if (!text || typeof text !== "string" || !text.trim()) {
		return res.status(400).json({ error: "Text is required." });
	}

	const model = process.env.GROQ_TTS_MODEL || DEFAULT_TTS_MODEL;
	const voiceRaw = (process.env.GROQ_TTS_VOICE || DEFAULT_TTS_VOICE).toLowerCase();
	const voice = ALLOWED_VOICES.has(voiceRaw) ? voiceRaw : DEFAULT_TTS_VOICE;
	const prepared = sanitizeSpeechText(text);
	const chunks = chunkSpeechText(prepared);

	if (!chunks.length) {
		return res.status(400).json({ error: "Text is empty after processing." });
	}

	try {
		const audioChunks = [];

		for (const chunk of chunks) {
			const input = prepareOrpheusInput(chunk);
			const upstream = await fetch(GROQ_SPEECH_URL, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${apiKey}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model,
					voice,
					input,
					response_format: "wav",
				}),
			});

			if (!upstream.ok) {
				const detail = await upstream.text();
				console.error("Groq TTS error:", upstream.status, detail);
				const err = groqErrorMessage(upstream.status, detail);
				return res.status(502).json(err);
			}

			const buffer = Buffer.from(await upstream.arrayBuffer());
			audioChunks.push(buffer.toString("base64"));
		}

		return res.status(200).json({ chunks: audioChunks });
	} catch (err) {
		console.error("Speech API error:", err);
		return res.status(500).json({ error: "Failed to reach speech service." });
	}
}

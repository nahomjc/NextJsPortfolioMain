const GROQ_TRANSCRIPTIONS_URL =
	"https://api.groq.com/openai/v1/audio/transcriptions";

const DEFAULT_STT_MODEL = "whisper-large-v3-turbo";

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "8mb",
		},
	},
};

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const apiKey = process.env.GROQ_API_KEY;
	if (!apiKey) {
		return res.status(503).json({
			error: "Voice transcription is not configured. Add GROQ_API_KEY to your environment.",
		});
	}

	const { audio, mimeType = "audio/webm" } = req.body ?? {};
	if (!audio || typeof audio !== "string") {
		return res.status(400).json({ error: "Audio payload is required." });
	}

	let buffer;
	try {
		buffer = Buffer.from(audio, "base64");
	} catch {
		return res.status(400).json({ error: "Invalid audio encoding." });
	}

	if (buffer.length < 256) {
		return res.status(400).json({ error: "Audio clip is too short." });
	}

	const model = process.env.GROQ_STT_MODEL || DEFAULT_STT_MODEL;
	const ext = mimeType.includes("mp4") || mimeType.includes("m4a") ? "m4a" : "webm";
	const filename = `utterance.${ext}`;

	const form = new FormData();
	form.append("file", new Blob([buffer], { type: mimeType }), filename);
	form.append("model", model);
	form.append("language", "en");
	form.append("response_format", "json");
	form.append("temperature", "0");

	try {
		const upstream = await fetch(GROQ_TRANSCRIPTIONS_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
			body: form,
		});

		if (!upstream.ok) {
			const detail = await upstream.text();
			console.error("Groq STT error:", upstream.status, detail);
			return res.status(502).json({
				error: "Transcription failed. Try again in a moment.",
			});
		}

		const data = await upstream.json();
		const text = typeof data.text === "string" ? data.text.trim() : "";

		return res.status(200).json({ text });
	} catch (err) {
		console.error("Transcribe API error:", err);
		return res.status(500).json({ error: "Failed to reach transcription service." });
	}
}

import { buildChatSystemPrompt, buildVoiceChatSystemPrompt } from "../../lib/chatSystemPrompt";
import { truncateForVoice } from "../../lib/sanitizeSpeechText";

import { SITE_URL } from "../../lib/seo";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const DEFAULT_MODEL = "deepseek/deepseek-chat";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const apiKey = process.env.OPENROUTER_API_KEY;
	if (!apiKey) {
		return res.status(503).json({
			error: "Chat is not configured. Add OPENROUTER_API_KEY to your environment.",
		});
	}

	const { messages, voice = false } = req.body ?? {};

	if (!Array.isArray(messages) || messages.length === 0) {
		return res.status(400).json({ error: "Messages array is required" });
	}

	const sanitized = messages
		.filter(
			(m) =>
				m &&
				(m.role === "user" || m.role === "assistant") &&
				typeof m.content === "string" &&
				m.content.trim().length > 0,
		)
		.slice(-20)
		.map((m) => ({ role: m.role, content: m.content.trim().slice(0, 4000) }));

	if (!sanitized.length || sanitized[sanitized.length - 1].role !== "user") {
		return res.status(400).json({ error: "Last message must be from the user" });
	}

	const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;
	const systemPrompt = voice ? buildVoiceChatSystemPrompt() : buildChatSystemPrompt();

	try {
		const upstream = await fetch(OPENROUTER_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
				"HTTP-Referer": siteUrl,
				"X-Title": "Nahom Portfolio Assistant",
			},
			body: JSON.stringify({
				model,
				messages: [{ role: "system", content: systemPrompt }, ...sanitized],
				max_tokens: voice ? 80 : 900,
				temperature: voice ? 0.55 : 0.65,
				stream: !voice,
			}),
		});

		if (!upstream.ok) {
			const detail = await upstream.text();
			console.error("OpenRouter error:", upstream.status, detail);
			return res.status(502).json({
				error: "The AI service returned an error. Try again in a moment.",
			});
		}

		if (voice) {
			const data = await upstream.json();
			const raw = data?.choices?.[0]?.message?.content?.trim() ?? "";
			const content = truncateForVoice(raw);
			if (!content) {
				return res.status(502).json({ error: "Empty response from AI service." });
			}
			return res.status(200).json({ content });
		}

		res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
		res.setHeader("Cache-Control", "no-cache, no-transform");
		res.setHeader("Connection", "keep-alive");
		res.setHeader("X-Accel-Buffering", "no");

		const reader = upstream.body.getReader();
		const decoder = new TextDecoder();
		let buffer = "";

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			buffer += decoder.decode(value, { stream: true });
			const lines = buffer.split("\n");
			buffer = lines.pop() || "";

			for (const line of lines) {
				if (!line.startsWith("data: ")) continue;

				const payload = line.slice(6).trim();
				if (payload === "[DONE]") {
					res.write("data: [DONE]\n\n");
					res.end();
					return;
				}

				try {
					const parsed = JSON.parse(payload);
					const delta = parsed?.choices?.[0]?.delta?.content;
					if (delta) {
						res.write(`data: ${JSON.stringify({ content: delta })}\n\n`);
					}
				} catch {
					// skip malformed chunks
				}
			}
		}

		res.write("data: [DONE]\n\n");
		res.end();
	} catch (err) {
		console.error("Chat API error:", err);
		if (!res.headersSent) {
			return res.status(500).json({ error: "Failed to reach the AI service." });
		}
		res.end();
	}
}

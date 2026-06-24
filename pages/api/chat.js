import { buildChatSystemPrompt } from "../../lib/chatSystemPrompt";
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

	const { messages } = req.body ?? {};
	if (!Array.isArray(messages) || messages.length === 0) {
		return res.status(400).json({ error: "Messages array is required" });
	}

	const sanitized = messages
		.filter(
			(m) =>
				m &&
				(m.role === "user" || m.role === "assistant") &&
				typeof m.content === "string" &&
				m.content.trim().length > 0
		)
		.slice(-20)
		.map((m) => ({ role: m.role, content: m.content.trim().slice(0, 4000) }));

	if (!sanitized.length || sanitized[sanitized.length - 1].role !== "user") {
		return res.status(400).json({ error: "Last message must be from the user" });
	}

	const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

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
				messages: [{ role: "system", content: buildChatSystemPrompt() }, ...sanitized],
				max_tokens: 900,
				temperature: 0.65,
			}),
		});

		if (!upstream.ok) {
			const detail = await upstream.text();
			console.error("OpenRouter error:", upstream.status, detail);
			return res.status(502).json({
				error: "The AI service returned an error. Try again in a moment.",
			});
		}

		const data = await upstream.json();
		const content = data?.choices?.[0]?.message?.content?.trim();

		if (!content) {
			return res.status(502).json({ error: "Empty response from AI service." });
		}

		return res.status(200).json({ content, model });
	} catch (err) {
		console.error("Chat API error:", err);
		return res.status(500).json({ error: "Failed to reach the AI service." });
	}
}

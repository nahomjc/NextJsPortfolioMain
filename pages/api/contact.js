import { FORMSPREE_URL } from "../../lib/contactConfig";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { name, email, phone, subject, message } = req.body ?? {};

	if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
		return res.status(400).json({ error: "Name, email, subject, and message are required." });
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
		return res.status(400).json({ error: "Invalid email address." });
	}

	try {
		const upstream = await fetch(FORMSPREE_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				name: name.trim().slice(0, 200),
				email: email.trim().slice(0, 200),
				phone: (phone || "").trim().slice(0, 50),
				subject: subject.trim().slice(0, 200),
				message: message.trim().slice(0, 4000),
				_source: req.body?.source === "voice" ? "voice-assistant" : "api",
			}),
		});

		if (!upstream.ok) {
			const detail = await upstream.text();
			console.error("Formspree error:", upstream.status, detail);
			return res.status(502).json({ error: "Could not deliver your message. Try the contact form." });
		}

		return res.status(200).json({ ok: true });
	} catch (err) {
		console.error("Contact API error:", err);
		return res.status(500).json({ error: "Failed to send message." });
	}
}

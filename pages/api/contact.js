import { FORMSPREE_URL } from "../../lib/contactConfig";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email) {
	if (!EMAIL_RE.test(email)) return false;
	const domain = email.split("@")[1] || "";
	const parts = domain.split(".");
	const tld = parts[parts.length - 1] || "";
	if (tld.length < 2 || tld.includes("-")) return false;
	return !parts.some((part) => /^([a-z0-9]-){2,}[a-z0-9]$/i.test(part));
}

async function deliverToFormspree(fields) {
	const jsonRes = await fetch(FORMSPREE_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(fields),
	});

	if (jsonRes.ok) return { ok: true };

	const jsonDetail = await jsonRes.text();

	const params = new URLSearchParams();
	for (const [key, value] of Object.entries(fields)) {
		if (value != null && String(value).trim()) {
			params.append(key, String(value).trim());
		}
	}

	const formRes = await fetch(FORMSPREE_URL, {
		method: "POST",
		headers: { Accept: "application/json" },
		body: params,
	});

	if (formRes.ok) return { ok: true };

	const formDetail = await formRes.text();
	return { ok: false, status: formRes.status, detail: formDetail || jsonDetail };
}

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { name, email, phone, subject, message } = req.body ?? {};

	if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
		return res.status(400).json({ error: "Name, email, subject, and message are required." });
	}

	const cleanEmail = email.trim().slice(0, 200);
	if (!isValidEmail(cleanEmail)) {
		return res.status(400).json({
			error: "Invalid email address. Say change email and try again.",
		});
	}

	const fields = {
		name: name.trim().slice(0, 200),
		email: cleanEmail,
		phone: (phone || "").trim().slice(0, 50),
		subject: subject.trim().slice(0, 200),
		message: message.trim().slice(0, 4000),
	};

	if (req.body?.source === "voice") {
		fields.message = `${fields.message}\n\n(Source: voice assistant)`;
	}

	try {
		const result = await deliverToFormspree(fields);

		if (!result.ok) {
			console.error("Formspree error:", result.status, result.detail);
			return res.status(502).json({ error: "Could not deliver your message. Try the contact form." });
		}

		return res.status(200).json({ ok: true });
	} catch (err) {
		console.error("Contact API error:", err);
		return res.status(500).json({ error: "Failed to send message." });
	}
}

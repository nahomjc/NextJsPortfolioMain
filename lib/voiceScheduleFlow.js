const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function stripEmailPrefix(text) {
	return text
		.trim()
		.toLowerCase()
		.replace(
			/^(my\s+)?(email(\s+address)?\s+(is|address\s+is)|it's|its|this\s+is)\s+/i,
			"",
		);
}

/** Join "k i a y" or "g m a i l" into kiay / gmail when every token is a single character. */
function collapseSpelledSegment(segment) {
	const tokens = segment
		.trim()
		.split(/\s+/)
		.map((t) => t.replace(/^[,.]|[,.;:!?]+$/g, ""))
		.filter(Boolean);

	if (!tokens.length) return "";
	if (tokens.length === 1) return tokens[0];

	const allSingleChar = tokens.every(
		(t) => t.length === 1 && /[a-z0-9._-]/i.test(t),
	);
	if (allSingleChar) return tokens.join("");

	return tokens.join("");
}

function normalizeDomainPart(domain) {
	let d = domain.trim();
	d = d.replace(/\s+dot\s+/g, ".");
	d = d.replace(/\s*\.\s*/g, ".");
	return d
		.split(".")
		.map((part) => collapseSpelledSegment(part))
		.filter(Boolean)
		.join(".");
}

/** Turn STT output like "k i a y at gmail dot com" into kiay@gmail.com */
export function normalizeSpokenEmail(text) {
	let s = stripEmailPrefix(text);
	s = s.replace(/\s+as\s+in\s+\w+/gi, " ");
	s = s.replace(/\bdouble\s+([a-z0-9])\b/gi, "$1$1");
	s = s.replace(/\b([a-z0-9])\.(?=\s|$)/gi, "$1 ");

	const atParts = s.split(/\s+at\s+|@/i);
	if (atParts.length < 2) {
		s = s.replace(/\s+dot\s+/g, ".");
		s = s.replace(/\s*\.\s*/g, ".");
		s = s.replace(/\b(g\s*mail|gee\s*mail)\b/g, "gmail");
		s = s.replace(/\bhot\s*mail\b/g, "hotmail");
		s = s.replace(/\bout\s*look\b/g, "outlook");
		s = s.replace(/\bunderscore\b/g, "_");
		s = s.replace(/\bdash\b/g, "-");
		s = s.replace(/\s+/g, "");
		s = s.replace(/@+/g, "@");
		s = s.replace(
			/@(gmail|yahoo|hotmail|outlook|icloud)(?:\.com|com)?$/i,
			(_, provider) => `@${provider.toLowerCase()}.com`,
		);
		return s;
	}

	const local = collapseSpelledSegment(atParts[0]);
	const domain = normalizeDomainPart(atParts.slice(1).join(""));

	let email = `${local}@${domain}`;
	email = email.replace(/\b(g\s*mail|gee\s*mail)\b/g, "gmail");
	email = email.replace(/\bhot\s*mail\b/g, "hotmail");
	email = email.replace(/\bout\s*look\b/g, "outlook");
	email = email.replace(/\bunderscore\b/g, "_");
	email = email.replace(/\bdash\b/g, "-");
	email = email.replace(/\s+/g, "");
	email = email.replace(/@+/g, "@");
	email = email.replace(
		/@(gmail|yahoo|hotmail|outlook|icloud)(?:\.com|com)?$/i,
		(_, provider) => `@${provider.toLowerCase()}.com`,
	);
	return email;
}

export function createScheduleSession() {
	return {
		active: false,
		step: null,
		data: { name: "", email: "", phone: "", datetime: "", topic: "" },
	};
}

export function startSchedule(session) {
	session.active = true;
	session.step = "name";
	session.data = { name: "", email: "", phone: "", datetime: "", topic: "" };
	return "I'd be happy to set that up. What's your name?";
}

export function emailStepPrompt() {
	return "What's your email? Say it normally or spell it letter by letter, like k i a y at gmail dot com.";
}

export function resetSchedule(session) {
	session.active = false;
	session.step = null;
	session.data = { name: "", email: "", phone: "", datetime: "", topic: "" };
}

function isAffirmative(text) {
	return /^(yes|yeah|yep|sure|ok|okay|confirm|send|do it|go ahead|please|correct|that's right|sounds good)/i.test(
		text.trim(),
	);
}

function isNegative(text) {
	return /^(no|nope|cancel|stop|never\s?mind|don't|wrong)/i.test(text.trim());
}

function isSkip(text) {
	return /^(skip|none|no phone|don't have|pass)$/i.test(text.trim());
}

export function processScheduleInput(session, text) {
	const trimmed = (text || "").trim();
	if (!session.active) return { kind: "idle" };

	if (session.step === "confirm") {
		if (isAffirmative(trimmed)) {
			return { kind: "submit", data: { ...session.data } };
		}
		if (isNegative(trimmed)) {
			resetSchedule(session);
			return {
				kind: "reply",
				reply: "No problem. Say book a meeting anytime if you change your mind.",
			};
		}
		return { kind: "reply", reply: "Say yes to send, or no to cancel." };
	}

	if (session.step === "name") {
		if (trimmed.length < 2) {
			return { kind: "reply", reply: "Please tell me your name." };
		}
		session.data.name = trimmed;
		session.step = "email";
		const first = trimmed.split(/\s+/)[0];
		return { kind: "reply", reply: `Thanks ${first}. ${emailStepPrompt()}` };
	}

	if (session.step === "email") {
		const email = normalizeSpokenEmail(trimmed);
		if (!EMAIL_RE.test(email)) {
			return {
				kind: "reply",
				reply: "I didn't catch that. Say it normally or spell it letter by letter.",
			};
		}
		session.data.email = email;
		session.step = "phone";
		return { kind: "reply", reply: "Your phone number? Say skip if email only." };
	}

	if (session.step === "phone") {
		session.data.phone = isSkip(trimmed) ? "" : trimmed;
		session.step = "datetime";
		return { kind: "reply", reply: "When works for you? Share date and time." };
	}

	if (session.step === "datetime") {
		if (trimmed.length < 3) {
			return { kind: "reply", reply: "Give me a date and time for the meeting." };
		}
		session.data.datetime = trimmed;
		session.step = "topic";
		return { kind: "reply", reply: "Brief topic — what should we discuss?" };
	}

	if (session.step === "topic") {
		if (trimmed.length < 2) {
			return { kind: "reply", reply: "A short topic helps Nahom prepare." };
		}
		session.data.topic = trimmed;
		session.step = "confirm";
		const { name, email, phone, datetime, topic } = session.data;
		const phoneBit = phone ? `, phone ${phone}` : "";
		return {
			kind: "reply",
			reply: `Got it: ${name}, ${email}${phoneBit}, ${datetime}, about ${topic}. Send this to Nahom?`,
		};
	}

	resetSchedule(session);
	return { kind: "reply", reply: "Something went wrong. Say book a meeting to try again." };
}

export async function submitVoiceAppointment(data) {
	const res = await fetch("/api/contact", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name: data.name,
			email: data.email,
			phone: data.phone || "",
			subject: "Voice appointment request",
			message: `Preferred time: ${data.datetime}\n\nTopic: ${data.topic}\n\nSubmitted via hero voice assistant.`,
			source: "voice",
		}),
	});
	if (!res.ok) {
		const body = await res.json().catch(() => ({}));
		throw new Error(body.error || "Could not send appointment request.");
	}
}

export function triggerPhoneCall(href) {
	if (typeof window === "undefined") return;
	const link = document.createElement("a");
	link.href = href;
	link.rel = "noopener";
	document.body.appendChild(link);
	link.click();
	link.remove();
}

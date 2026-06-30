const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DIGIT_WORDS = {
	zero: "0",
	oh: "0",
	o: "0",
	one: "1",
	two: "2",
	three: "3",
	four: "4",
	five: "5",
	six: "6",
	seven: "7",
	eight: "8",
	nine: "9",
};

const STEP_PROGRESS = {
	name: { n: 1, label: "Name" },
	email: { n: 2, label: "Email" },
	email_confirm: { n: 3, label: "Confirm email" },
	phone: { n: 4, label: "Phone" },
	phone_confirm: { n: 4, label: "Confirm phone" },
	day: { n: 5, label: "Day" },
	time_window: { n: 6, label: "Time" },
	topic: { n: 7, label: "Topic" },
	confirm: { n: 8, label: "Confirm" },
};

function stripEmailPrefix(text) {
	return text
		.trim()
		.toLowerCase()
		.replace(
			/^(my\s+)?(email(\s+address)?\s+(is|address\s+is)|it's|its|this\s+is)\s+/i,
			"",
		);
}

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

/** Normalize spoken digits: "zero nine three seven..." → "0937..." */
export function normalizeSpokenPhone(text) {
	let s = (text || "").trim().toLowerCase();
	if (isSkip(s)) return "";

	s = s.replace(/\b(double|triple)\s+(\w+)\b/gi, (_, mult, digit) => {
		const d = DIGIT_WORDS[digit] ?? (/^\d$/.test(digit) ? digit : "");
		if (!d) return "";
		return d.repeat(mult === "double" ? 2 : 3);
	});

	for (const [word, digit] of Object.entries(DIGIT_WORDS)) {
		s = s.replace(new RegExp(`\\b${word}\\b`, "g"), digit);
	}

	return s.replace(/[^\d+]/g, "");
}

export function emailForSpeech(email) {
	return email.replace(/@/g, " at ").replace(/\./g, " dot ");
}

export function phoneForSpeech(phone) {
	return phone.split("").join(" ");
}

export function createScheduleSession() {
	return {
		active: false,
		step: null,
		pendingEmail: "",
		pendingPhone: "",
		data: {
			name: "",
			email: "",
			phone: "",
			day: "",
			timeWindow: "",
			topic: "",
		},
	};
}

export function startSchedule(session) {
	session.active = true;
	session.step = "name";
	session.pendingEmail = "";
	session.pendingPhone = "";
	session.data = {
		name: "",
		email: "",
		phone: "",
		day: "",
		timeWindow: "",
		topic: "",
	};
	return "I'd be happy to set that up. Say cancel anytime. What's your name?";
}

export function emailStepPrompt() {
	return "What's your email? Say it normally or spell it letter by letter.";
}

export function resetSchedule(session) {
	session.active = false;
	session.step = null;
	session.pendingEmail = "";
	session.pendingPhone = "";
	session.data = {
		name: "",
		email: "",
		phone: "",
		day: "",
		timeWindow: "",
		topic: "",
	};
}

export function getScheduleProgress(session) {
	if (!session.active || !session.step) {
		return { step: 0, total: 8, label: "" };
	}
	const info = STEP_PROGRESS[session.step] || { n: 0, label: "" };
	return { step: info.n, total: 8, label: info.label };
}

export function getScheduleSnapshot(session) {
	const { name, email, phone, day, timeWindow, topic } = session.data;
	const pending = session.pendingEmail || session.pendingPhone;
	return {
		active: session.active,
		step: session.step,
		name: name || null,
		email: email || session.pendingEmail || null,
		phone: phone || session.pendingPhone || null,
		day: day || null,
		timeWindow: timeWindow || null,
		topic: topic || null,
		pending: pending || null,
		progress: getScheduleProgress(session),
	};
}

function isAffirmative(text) {
	return /^(yes|yeah|yep|sure|ok|okay|confirm|send|do it|go ahead|please|correct|that's right|sounds good|right)/i.test(
		text.trim(),
	);
}

function isNegative(text) {
	return /^(no|nope|wrong|not right|incorrect)/i.test(text.trim());
}

function isSkip(text) {
	return /^(skip|none|no phone|don't have|pass)$/i.test(text.trim());
}

function isCancel(text) {
	return /\b(cancel|start over|never\s?mind|abort)\b/i.test(text.trim());
}

function detectCorrection(trimmed) {
	if (isCancel(trimmed)) return { type: "cancel" };
	if (/\bgo\s+back\b/i.test(trimmed)) return { type: "back" };
	const fieldMatch = trimmed.match(
		/\b(?:change|fix|update|edit)\s+(?:my\s+)?(name|email|phone|day|time|topic)\b/i,
	);
	if (fieldMatch) {
		const field = fieldMatch[1].toLowerCase();
		return { type: "field", field: field === "time" ? "time_window" : field };
	}
	return null;
}

const PREV_STEP = {
	email: "name",
	email_confirm: "email",
	phone: "email_confirm",
	phone_confirm: "phone",
	day: "phone",
	time_window: "day",
	topic: "time_window",
	confirm: "topic",
};

const FIELD_TO_STEP = {
	name: "name",
	email: "email",
	phone: "phone",
	day: "day",
	time_window: "time_window",
	topic: "topic",
};

function applyCorrection(session, correction) {
	if (correction.type === "cancel") {
		resetSchedule(session);
		return {
			kind: "reply",
			reply: "Booking cancelled. Say book a meeting anytime to try again.",
		};
	}

	if (correction.type === "back") {
		const prev = PREV_STEP[session.step];
		if (!prev) {
			return { kind: "reply", reply: "You're at the start. What's your name?" };
		}
		session.step = prev;
		return promptForStep(session);
	}

	if (correction.type === "field") {
		const step = FIELD_TO_STEP[correction.field];
		if (!step) return { kind: "reply", reply: "Say change name, email, phone, day, time, or topic." };
		session.step = step;
		if (step === "email") {
			session.data.email = "";
			session.pendingEmail = "";
		}
		if (step === "phone") {
			session.data.phone = "";
			session.pendingPhone = "";
		}
		return promptForStep(session);
	}

	return null;
}

function promptForStep(session) {
	switch (session.step) {
		case "name":
			return { kind: "reply", reply: "What's your name?" };
		case "email":
			return { kind: "reply", reply: emailStepPrompt() };
		case "email_confirm":
			return {
				kind: "reply",
				reply: `I have ${emailForSpeech(session.pendingEmail)}. Is that correct?`,
			};
		case "phone":
			return { kind: "reply", reply: "Your phone number? Say skip if email only." };
		case "phone_confirm":
			return {
				kind: "reply",
				reply: `I have ${phoneForSpeech(session.pendingPhone)}. Is that correct?`,
			};
		case "day":
			return {
				kind: "reply",
				reply: "What day works? This week, next week, or a specific day like Tuesday.",
			};
		case "time_window":
			return { kind: "reply", reply: "Morning, afternoon, or evening?" };
		case "topic":
			return { kind: "reply", reply: "Brief topic — what should we discuss?" };
		case "confirm":
			return buildFinalConfirm(session);
		default:
			return { kind: "reply", reply: "Something went wrong. Say book a meeting to try again." };
	}
}

function normalizeTimeWindow(text) {
	const t = text.trim().toLowerCase();
	if (/\bmorn/.test(t)) return "Morning";
	if (/\b(after|noon|midday)\b/.test(t)) return "Afternoon";
	if (/\beven/.test(t)) return "Evening";
	if (/\bflex/.test(t)) return "Flexible";
	return text.trim();
}

function buildFinalConfirm(session) {
	const { name, day, timeWindow, topic } = session.data;
	return {
		kind: "reply",
		reply: `About ${topic}, ${day} ${timeWindow}. Full details are on screen. Send to Nahom?`,
		quietConfirm: true,
		summary: { name, ...session.data },
	};
}

function buildSubmitData(session) {
	const { name, email, phone, day, timeWindow, topic } = session.data;
	return {
		name,
		email,
		phone,
		datetime: `${day} — ${timeWindow}`,
		topic,
	};
}

export function processScheduleInput(session, text) {
	const trimmed = (text || "").trim();
	if (!session.active) return { kind: "idle" };

	const correction = detectCorrection(trimmed);
	if (correction && session.step !== "name") {
		const result = applyCorrection(session, correction);
		if (result) return result;
	}

	if (session.step === "confirm") {
		if (isAffirmative(trimmed)) {
			return { kind: "submit", data: buildSubmitData(session) };
		}
		if (isNegative(trimmed)) {
			return {
				kind: "reply",
				reply: "Say change email, change time, change topic, or cancel.",
			};
		}
		return { kind: "reply", reply: "Say yes to send, or no to change something." };
	}

	if (session.step === "email_confirm") {
		if (isAffirmative(trimmed)) {
			session.data.email = session.pendingEmail;
			session.pendingEmail = "";
			session.step = "phone";
			return { kind: "reply", reply: "Your phone number? Say skip if email only." };
		}
		if (isNegative(trimmed)) {
			session.pendingEmail = "";
			session.step = "email";
			return { kind: "reply", reply: emailStepPrompt() };
		}
		return { kind: "reply", reply: "Say yes if the email is correct, or no to try again." };
	}

	if (session.step === "phone_confirm") {
		if (isAffirmative(trimmed)) {
			session.data.phone = session.pendingPhone;
			session.pendingPhone = "";
			session.step = "day";
			return {
				kind: "reply",
				reply: "What day works? This week, next week, or a specific day like Tuesday.",
			};
		}
		if (isNegative(trimmed)) {
			session.pendingPhone = "";
			session.step = "phone";
			return { kind: "reply", reply: "Your phone number? Say skip if email only." };
		}
		return { kind: "reply", reply: "Say yes if the number is correct, or no to try again." };
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
		session.pendingEmail = email;
		session.step = "email_confirm";
		return {
			kind: "reply",
			reply: `I have ${emailForSpeech(email)}. Is that correct?`,
		};
	}

	if (session.step === "phone") {
		if (isSkip(trimmed)) {
			session.data.phone = "";
			session.step = "day";
			return {
				kind: "reply",
				reply: "What day works? This week, next week, or a specific day like Tuesday.",
			};
		}
		const phone = normalizeSpokenPhone(trimmed);
		if (phone.length < 7) {
			return {
				kind: "reply",
				reply: "I didn't catch that number. Say digits or say skip.",
			};
		}
		session.pendingPhone = phone;
		session.step = "phone_confirm";
		return {
			kind: "reply",
			reply: `I have ${phoneForSpeech(phone)}. Is that correct?`,
		};
	}

	if (session.step === "day") {
		if (trimmed.length < 2) {
			return {
				kind: "reply",
				reply: "What day works? This week, next week, or a specific day.",
			};
		}
		session.data.day = trimmed;
		session.step = "time_window";
		return { kind: "reply", reply: "Morning, afternoon, or evening?" };
	}

	if (session.step === "time_window") {
		const window = normalizeTimeWindow(trimmed);
		if (window.length < 3) {
			return { kind: "reply", reply: "Say morning, afternoon, or evening." };
		}
		session.data.timeWindow = window;
		session.step = "topic";
		return { kind: "reply", reply: "Brief topic — what should we discuss?" };
	}

	if (session.step === "topic") {
		if (trimmed.length < 2) {
			return { kind: "reply", reply: "A short topic helps Nahom prepare." };
		}
		session.data.topic = trimmed;
		session.step = "confirm";
		return buildFinalConfirm(session);
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

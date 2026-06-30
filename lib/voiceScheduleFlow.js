const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
		return { kind: "reply", reply: `Thanks ${first}. What's your email?` };
	}

	if (session.step === "email") {
		if (!EMAIL_RE.test(trimmed)) {
			return { kind: "reply", reply: "That email doesn't look right. Try again?" };
		}
		session.data.email = trimmed;
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

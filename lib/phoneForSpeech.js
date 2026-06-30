const DIGIT_NAMES = [
	"zero",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
];

/** Read a phone number digit-by-digit for TTS (avoids "two million…"). */
export function phoneForSpeech(phone) {
	return [...String(phone || "")]
		.map((ch) => {
			if (ch === "+") return "plus";
			if (/\d/.test(ch)) return DIGIT_NAMES[Number(ch)];
			return "";
		})
		.filter(Boolean)
		.join(" ");
}

/** Replace phone-like digit runs in speech text with spoken digits. */
export function speechifyPhoneNumbers(text) {
	if (!text) return text;
	return text.replace(/\+?\d[\d\s().-]{5,}\d/g, (match) => {
		const digits = match.replace(/\D/g, "");
		if (digits.length < 7) return match;
		return phoneForSpeech(digits);
	});
}

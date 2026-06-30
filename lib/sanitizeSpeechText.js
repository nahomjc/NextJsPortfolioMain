const MAX_VOICE_CHARS = 180;

import { speechifyPhoneNumbers } from "./phoneForSpeech";
import { humanizeForSpeech } from "./humanizeSpeechText";

export function sanitizeSpeechText(text) {
	return humanizeForSpeech(
		speechifyPhoneNumbers(
			text
				.replace(/https?:\/\/\S+/gi, "")
				.replace(/\S+@\S+\.\S+/g, "")
				.replace(/[*_#`[\]]/g, "")
				.replace(/\s+/g, " ")
				.trim(),
		),
	);
}

export function truncateForVoice(text, max = MAX_VOICE_CHARS) {
	const cleaned = sanitizeSpeechText(text);
	if (!cleaned) return "";
	if (cleaned.length <= max) return cleaned;

	const slice = cleaned.slice(0, max);
	const breakAt = Math.max(
		slice.lastIndexOf(". "),
		slice.lastIndexOf("? "),
		slice.lastIndexOf("! "),
	);

	if (breakAt >= max * 0.45) {
		return slice.slice(0, breakAt + 1).trim();
	}

	const wordBreak = slice.lastIndexOf(" ");
	if (wordBreak >= max * 0.5) {
		return `${slice.slice(0, wordBreak).trim()}.`;
	}

	return `${slice.trim()}.`;
}

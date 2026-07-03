const FILLER_PREFIX =
	/^(?:um+|uh+|er+|ah+|like|so|well|okay|ok|hey|please|can you|could you|would you)\s*[,.]?\s*/i;

const MISHEARING_REPLACEMENTS = [
	[/\bna\s*home\b/gi, "Nahom"],
	[/\bna\s*hom\b/gi, "Nahom"],
	[/\bnahom'?s\b/gi, "Nahom's"],
	[/\btesfaye\b/gi, "Tesfaye"],
	[/\bg\s*mail\b/gi, "gmail"],
	[/\bgee\s*mail\b/gi, "gmail"],
	[/\bhot\s*mail\b/gi, "hotmail"],
	[/\bout\s*look\b/gi, "outlook"],
	[/\bnext\s*js\b/gi, "Next.js"],
	[/\bnextjs\b/gi, "Next.js"],
	[/\btype\s*script\b/gi, "TypeScript"],
	[/\btypescript\b/gi, "TypeScript"],
	[/\bschedual\b/gi, "schedule"],
	[/\bscheduel\b/gi, "schedule"],
];

/** Light cleanup after Whisper — no extra API calls. */
export function normalizeVoiceTranscript(text) {
	let s = (text || "").trim();
	if (!s) return "";

	s = s.replace(/\s+/g, " ");

	for (const [pattern, replacement] of MISHEARING_REPLACEMENTS) {
		s = s.replace(pattern, replacement);
	}

	while (FILLER_PREFIX.test(s)) {
		s = s.replace(FILLER_PREFIX, "").trim();
	}

	return s.trim();
}

/** True when transcript is empty or only punctuation/noise. */
export function isEmptyTranscript(text) {
	const s = (text || "").trim();
	if (!s) return true;
	return /^[\s.,!?;:'"()[\]{}\-–—…]+$/u.test(s);
}

const GROQ_SKIP_KEY = "groq_tts_skip_until";

export function prefersBrowserTts() {
	if (process.env.NEXT_PUBLIC_VOICE_TTS === "browser") return true;
	if (typeof window === "undefined") return false;
	try {
		const until = window.sessionStorage.getItem(GROQ_SKIP_KEY);
		return until ? Date.now() < Number(until) : false;
	} catch {
		return false;
	}
}

export function markGroqTtsRateLimited(retryAfterSeconds = 3600) {
	if (typeof window === "undefined") return;
	try {
		const ms = Math.max(60, retryAfterSeconds) * 1000;
		window.sessionStorage.setItem(GROQ_SKIP_KEY, String(Date.now() + ms));
	} catch {
		// ignore quota / private mode
	}
}

export function isGroqTtsFallbackCode(code) {
	return (
		code === "rate_limit_exceeded" ||
		code === "tts_disabled" ||
		code === "missing_groq_key"
	);
}

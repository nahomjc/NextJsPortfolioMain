const SCHEDULE_RE =
	/\b(book|schedule|arrange|set up|make)\b.*\b(appointment|meeting|call|time|slot)\b|\b(appointment|meeting)\s+with\s+nahom\b|\bwant\s+to\s+(meet|book|schedule)\b|\bschedule\s+(with|a)\b/i;

const CALL_NEGATIVE_RE =
	/\b(don't|do not|dont|never|not)\s+(call|phone|dial|ring)\b|\bno\s+calls?\b/i;

const TERMINATE_RE =
	/^(terminate|close|exit|stop|goodbye)$|\b(terminate|close(\s+the)?\s*(voice|session|chat|link)|exit|end\s+session|stop\s+(listening|talking)|hang\s+up|disconnect)\b|^\[?\s*terminate\s*\]?$/i;

function matchesCallIntent(text) {
	if (CALL_NEGATIVE_RE.test(text)) return false;

	if (
		/^(?:please\s+)?(call|phone|dial|ring)(?:\s+(?:him|nahom|now|please))?\s*[!.]?$/i.test(
			text,
		)
	) {
		return true;
	}

	return (
		/\b(call|phone|dial|ring)\s+(?:nahom|him|now|please|today)\b/i.test(text) ||
		/\b(?:want|need|like|ask)(?:\s+\w+){0,4}\s+to\s+(?:call|phone|dial|ring)\b/i.test(
			text,
		) ||
		/\b(?:can|could|would|will)\s+you\s+(?:call|phone|dial|ring)\b/i.test(text) ||
		/\bgive\s+me\s+(?:(?:nahom'?s?|his)\s+)?(?:phone\s+)?number\b/i.test(text)
	);
}

export function detectTerminateIntent(text) {
	return TERMINATE_RE.test((text || "").trim());
}

export function detectScheduleIntent(text) {
	return SCHEDULE_RE.test((text || "").trim());
}

export function detectCallIntent(text) {
	const t = (text || "").trim();
	if (!t) return false;
	if (detectScheduleIntent(t)) return false;
	if (/\b(book|schedule|arrange|later|tomorrow|next week)\b/i.test(t)) return false;
	return matchesCallIntent(t);
}

const SCHEDULE_RE =
	/\b(book|schedule|arrange|set up|make)\b.*\b(appointment|meeting|call|time|slot)\b|\b(appointment|meeting)\s+with\s+nahom\b|\bwant\s+to\s+(meet|book|schedule)\b|\bschedule\s+(with|a)\b/i;

const CALL_RE =
	/\b(call|phone|dial|ring)\s+(nahom|him)\b|\bcall\s+nahom\b|\bphone\s+nahom\b|\bgive\s+me\s+(nahom'?s?\s+)?(phone|number)\b/i;

const TERMINATE_RE =
	/^(terminate|close|exit|stop|goodbye)$|\b(terminate|close(\s+the)?\s*(voice|session|chat|link)|exit|end\s+session|stop\s+(listening|talking)|hang\s+up|disconnect)\b|^\[?\s*terminate\s*\]?$/i;

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
	return CALL_RE.test(t);
}

const MAX_CHUNK = 200;

export function chunkSpeechText(text) {
	const cleaned = text.replace(/\s+/g, " ").trim();
	if (!cleaned) return [];

	if (cleaned.length <= MAX_CHUNK) {
		return [cleaned];
	}

	const chunks = [];
	let remaining = cleaned;

	while (remaining.length > 0) {
		if (remaining.length <= MAX_CHUNK) {
			chunks.push(remaining);
			break;
		}

		let splitAt = remaining.lastIndexOf(". ", MAX_CHUNK);
		if (splitAt >= 0) {
			splitAt += 1;
		} else {
			splitAt = remaining.lastIndexOf(" ", MAX_CHUNK);
			if (splitAt < MAX_CHUNK * 0.25) {
				splitAt = MAX_CHUNK;
			}
		}

		const piece = remaining.slice(0, splitAt).trim();
		if (piece) chunks.push(piece);
		remaining = remaining.slice(splitAt).trim();
	}

	return chunks;
}

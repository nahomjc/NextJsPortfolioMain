/** Loosen text for conversational TTS — contractions, light pauses. */
export function humanizeForSpeech(text) {
	if (!text) return "";

	let s = text.trim();

	s = s
		.replace(/\bI am\b/g, "I'm")
		.replace(/\bYou are\b/gi, "you're")
		.replace(/\bWe are\b/gi, "we're")
		.replace(/\bThey are\b/gi, "they're")
		.replace(/\bIt is\b/gi, "it's")
		.replace(/\bThat is\b/gi, "that's")
		.replace(/\bWhat is\b/gi, "what's")
		.replace(/\bWho is\b/gi, "who's")
		.replace(/\bI would\b/g, "I'd")
		.replace(/\bI will\b/g, "I'll")
		.replace(/\bI have\b/g, "I've")
		.replace(/\bYou have\b/gi, "you've")
		.replace(/\bcannot\b/gi, "can't")
		.replace(/\bdo not\b/gi, "don't")
		.replace(/\bdoes not\b/gi, "doesn't")
		.replace(/\bdid not\b/gi, "didn't")
		.replace(/\bwill not\b/gi, "won't")
		.replace(/\bshould not\b/gi, "shouldn't")
		.replace(/\bI would be happy to\b/gi, "I'd be glad to")
		.replace(/\bI would like to\b/gi, "I'd like to")
		.replace(/\bPlease be advised\b/gi, "")
		.replace(/\bAdditionally,\b/gi, "Also,")
		.replace(/\bFurthermore,\b/gi, "Plus,");

	// Gentle pauses at natural phrase breaks (Orpheus reads commas softly)
	s = s
		.replace(/\. ([A-Z])/g, ". $1")
		.replace(/\? ([A-Z])/g, "? $1")
		.replace(/ — /g, ", ")
		.replace(/ - /g, ", ");

	return s.replace(/\s+/g, " ").trim();
}

/** Default Whisper prompt — guides spelling of portfolio names and voice commands. */
export const DEFAULT_STT_PROMPT =
	"Portfolio voice assistant. Nahom Tesfaye, Nahom, developer portfolio. " +
	"Commands: schedule, book a meeting, appointment, call, phone, terminate, close, exit. " +
	"Tech: Next.js, React, TypeScript, Node.js, PostgreSQL, Supabase. " +
	"Contact: email, phone number, Gmail, Outlook, Hotmail.";

export function getSttPrompt() {
	const custom = process.env.GROQ_STT_PROMPT?.trim();
	return custom || DEFAULT_STT_PROMPT;
}

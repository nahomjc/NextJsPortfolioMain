import { pickBrowserVoice, waitForBrowserVoices } from "./pickBrowserVoice";
import { sanitizeSpeechText } from "./sanitizeSpeechText";

export function createVoicePlayback() {
	let currentAudio = null;
	let stopped = false;
	let cachedBrowserVoice = null;

	const stop = () => {
		stopped = true;
		if (currentAudio) {
			currentAudio.pause();
			currentAudio.src = "";
			currentAudio = null;
		}
		if (typeof window !== "undefined" && window.speechSynthesis) {
			window.speechSynthesis.cancel();
		}
	};

	const playChunk = (base64) =>
		new Promise((resolve, reject) => {
			if (stopped) {
				resolve();
				return;
			}

			const audio = new Audio(`data:audio/wav;base64,${base64}`);
			currentAudio = audio;
			audio.onended = () => {
				if (currentAudio === audio) currentAudio = null;
				resolve();
			};
			audio.onerror = () => {
				if (currentAudio === audio) currentAudio = null;
				reject(new Error("Failed to play audio."));
			};
			audio.play().catch(reject);
		});

	const playWavChunks = async (base64Chunks) => {
		stopped = false;
		for (let i = 0; i < base64Chunks.length; i += 1) {
			if (stopped) break;
			await playChunk(base64Chunks[i]);
			if (i < base64Chunks.length - 1 && !stopped) {
				await new Promise((resolve) => window.setTimeout(resolve, 140));
			}
		}
	};

	const resolveBrowserVoice = async () => {
		if (cachedBrowserVoice) return cachedBrowserVoice;
		const voices = await waitForBrowserVoices();
		cachedBrowserVoice = pickBrowserVoice(voices);
		return cachedBrowserVoice;
	};

	const speakWithBrowser = async (text) => {
		if (stopped) return;
		if (typeof window === "undefined" || !window.speechSynthesis) {
			throw new Error("Browser speech is not available.");
		}

		window.speechSynthesis.cancel();
		const utterance = new SpeechSynthesisUtterance(sanitizeSpeechText(text));
		const voice = await resolveBrowserVoice();
		if (voice) utterance.voice = voice;
		utterance.lang = "en-US";
		utterance.rate = 0.94;
		utterance.pitch = 1;
		utterance.volume = 1;

		await new Promise((resolve, reject) => {
			utterance.onend = () => resolve();
			utterance.onerror = () => reject(new Error("Browser speech failed."));
			window.speechSynthesis.speak(utterance);
		});
	};

	return {
		playWavChunks,
		speakWithBrowser,
		stop,
	};
}

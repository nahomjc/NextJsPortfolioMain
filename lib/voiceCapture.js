const SPEECH_THRESHOLD = 0.018;
const SILENCE_MS = 1200;
const MIN_SPEECH_MS = 400;
const MAX_UTTERANCE_MS = 15000;
const ANALYSE_INTERVAL_MS = 80;
export const VOICE_IDLE_TIMEOUT_MS = 30000;

function pickMimeType() {
	if (typeof MediaRecorder === "undefined") return "";
	const types = [
		"audio/webm;codecs=opus",
		"audio/webm",
		"audio/mp4",
		"audio/ogg;codecs=opus",
	];
	for (const type of types) {
		if (MediaRecorder.isTypeSupported(type)) return type;
	}
	return "";
}

function rmsFromAnalyser(analyser, scratch) {
	analyser.getFloatTimeDomainData(scratch);
	let sum = 0;
	for (let i = 0; i < scratch.length; i += 1) {
		sum += scratch[i] * scratch[i];
	}
	return Math.sqrt(sum / scratch.length);
}

export function createVoiceSession({
	onUtterance,
	onError,
	onStateChange,
	onIdleTimeout,
	idleTimeoutMs = VOICE_IDLE_TIMEOUT_MS,
}) {
	let stream = null;
	let audioContext = null;
	let analyser = null;
	let source = null;
	let recorder = null;
	let chunks = [];
	let scratch = null;
	let intervalId = null;
	let paused = false;
	let destroyed = false;

	let speechActive = false;
	let speechStartedAt = 0;
	let silenceSince = 0;
	let lastVoiceAt = 0;
	let idleFired = false;

	const emitState = (state) => {
		onStateChange?.(state);
	};

	const cleanupRecorder = () => {
		if (!recorder) return;
		recorder.ondataavailable = null;
		recorder.onstop = null;
		recorder = null;
		chunks = [];
	};

	const stopRecorder = () => {
		if (!recorder || recorder.state === "inactive") return;
		try {
			recorder.stop();
		} catch {
			cleanupRecorder();
		}
	};

	const startRecorder = () => {
		if (!stream || destroyed || paused) return;
		const mimeType = pickMimeType();
		if (!mimeType) {
			onError?.(new Error("Recording is not supported in this browser."));
			return;
		}

		cleanupRecorder();
		chunks = [];
		recorder = new MediaRecorder(stream, { mimeType });
		recorder.ondataavailable = (e) => {
			if (e.data?.size) chunks.push(e.data);
		};
		recorder.onstop = () => {
			const blob = new Blob(chunks, { type: mimeType });
			cleanupRecorder();
			if (blob.size > 256) {
				onUtterance?.(blob, mimeType);
			}
		};
		recorder.start();
	};

	const tick = () => {
		if (!analyser || !scratch || destroyed) return;

		const level = rmsFromAnalyser(analyser, scratch);
		const now = performance.now();
		const speaking = level >= SPEECH_THRESHOLD;

		if (paused) return;

		if (speaking) {
			lastVoiceAt = now;
			idleFired = false;
		} else if (
			!idleFired &&
			lastVoiceAt &&
			now - lastVoiceAt >= idleTimeoutMs
		) {
			idleFired = true;
			onIdleTimeout?.();
			return;
		}

		if (!speechActive) {
			if (speaking) {
				speechActive = true;
				speechStartedAt = now;
				silenceSince = 0;
				startRecorder();
				emitState("capturing");
			}
			return;
		}

		if (speaking) {
			silenceSince = 0;
		} else if (!silenceSince) {
			silenceSince = now;
		}

		const speechDuration = now - speechStartedAt;
		const silentFor = silenceSince ? now - silenceSince : 0;

		if (
			(silenceSince && silentFor >= SILENCE_MS && speechDuration >= MIN_SPEECH_MS) ||
			speechDuration >= MAX_UTTERANCE_MS
		) {
			speechActive = false;
			silenceSince = 0;
			stopRecorder();
			emitState("listening");
		}
	};

	const start = async () => {
		if (destroyed) return;

		try {
			stream = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					autoGainControl: true,
				},
			});
		} catch (err) {
			onError?.(err);
			throw err;
		}

		audioContext = new (window.AudioContext || window.webkitAudioContext)();
		source = audioContext.createMediaStreamSource(stream);
		analyser = audioContext.createAnalyser();
		analyser.fftSize = 2048;
		scratch = new Float32Array(analyser.fftSize);
		source.connect(analyser);

		if (audioContext.state === "suspended") {
			await audioContext.resume();
		}

		intervalId = window.setInterval(tick, ANALYSE_INTERVAL_MS);
		lastVoiceAt = performance.now();
		emitState("listening");
	};

	const setPaused = (value) => {
		paused = value;
		if (paused) {
			speechActive = false;
			silenceSince = 0;
			stopRecorder();
		} else {
			lastVoiceAt = performance.now();
			idleFired = false;
		}
	};

	const destroy = () => {
		destroyed = true;
		if (intervalId) {
			window.clearInterval(intervalId);
			intervalId = null;
		}
		stopRecorder();
		if (source) {
			try {
				source.disconnect();
			} catch {
				// ignore
			}
			source = null;
		}
		if (stream) {
			for (const track of stream.getTracks()) {
				track.stop();
			}
			stream = null;
		}
		if (audioContext) {
			audioContext.close().catch(() => {});
			audioContext = null;
		}
		analyser = null;
		scratch = null;
	};

	return {
		start,
		setPaused,
		destroy,
	};
}

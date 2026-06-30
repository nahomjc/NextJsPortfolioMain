const PREFERRED_US_MALE_VOICES = [
	"Microsoft Guy Online (Natural)",
	"Microsoft Davis Online (Natural)",
	"Microsoft Christopher Online (Natural)",
	"Google US English",
	"Microsoft Mark - English (United States)",
	"Microsoft David - English (United States)",
	"Microsoft David Desktop",
	"Mark",
	"Aaron",
	"Fred",
	"Tom",
	"Alex",
	"David",
	"James",
	"Paul",
	"Ralph",
	"Guy",
];

const MALE_HINTS = [
	"male",
	"man",
	"guy",
	"davis",
	"christopher",
	"mark",
	"aaron",
	"fred",
	"tom",
	"alex",
	"james",
	"paul",
	"ralph",
	"bruce",
	"george",
	"richard",
	"steven",
	"eric",
	"microsoft guy",
	"microsoft david",
	"microsoft mark",
];

const FEMALE_HINTS = [
	"aria",
	"jenny",
	"samantha",
	"karen",
	"moira",
	"victoria",
	"zira",
	"hazel",
	"susan",
	"female",
	"woman",
	"girl",
	"hannah",
	"autumn",
	"diana",
	"linda",
	"heather",
	"michelle",
	"emma",
	"joanna",
	"kendra",
	"ivy",
	"allison",
	"ava",
	"sonia",
	"serena",
	"kate",
	"martha",
	"fiona",
	"tessa",
	"amelie",
	"ellen",
];

const BRITISH_HINTS = [
	"uk english",
	"en-gb",
	"british",
	"england",
	"oliver",
	"arthur",
	"malcolm",
	"stephen",
	"lee",
];

function nameIncludesAny(name, hints) {
	const lower = name.toLowerCase();
	return hints.some((hint) => lower.includes(hint));
}

function isLikelyFemale(voice) {
	return nameIncludesAny(voice.name, FEMALE_HINTS);
}

function isLikelyMale(voice) {
	return nameIncludesAny(voice.name, MALE_HINTS);
}

function isUsEnglish(voice) {
	const lang = voice.lang?.toLowerCase() ?? "";
	return lang === "en-us" || lang.startsWith("en-us");
}

function scoreVoice(voice) {
	let score = 0;
	const name = voice.name;

	if (isLikelyFemale(voice)) score -= 200;
	if (isLikelyMale(voice)) score += 80;
	if (nameIncludesAny(name, BRITISH_HINTS)) score -= 90;
	if (isUsEnglish(voice)) score += 50;
	if (voice.lang?.toLowerCase().startsWith("en-gb")) score -= 100;

	if (name.toLowerCase().includes("natural") || name.toLowerCase().includes("neural")) {
		score += 35;
	}
	if (name.toLowerCase().includes("online")) score += 18;
	if (name.toLowerCase().includes("google us")) score += 25;
	if (name.toLowerCase().includes("microsoft")) score += 10;
	if (!voice.localService) score += 5;

	for (let i = 0; i < PREFERRED_US_MALE_VOICES.length; i += 1) {
		if (name.includes(PREFERRED_US_MALE_VOICES[i])) {
			score += 70 - i * 3;
		}
	}

	return score;
}

export function pickBrowserVoice(voices) {
	if (!voices?.length) return null;

	const english = voices.filter((v) => v.lang?.toLowerCase().startsWith("en"));
	const usOnly = english.filter(isUsEnglish);
	const pool = usOnly.length ? usOnly : english;

	const explicitMale = pool.filter((v) => isLikelyMale(v) && !isLikelyFemale(v));
	const nonFemale = pool.filter((v) => !isLikelyFemale(v));
	const candidatePool = explicitMale.length
		? explicitMale
		: nonFemale.length
			? nonFemale
			: pool;

	const ranked = [...candidatePool].sort((a, b) => scoreVoice(b) - scoreVoice(a));
	return ranked[0] ?? voices[0];
}

export function waitForBrowserVoices() {
	if (typeof window === "undefined" || !window.speechSynthesis) {
		return Promise.resolve([]);
	}

	const existing = window.speechSynthesis.getVoices();
	if (existing.length) return Promise.resolve(existing);

	return new Promise((resolve) => {
		const finish = () => resolve(window.speechSynthesis.getVoices());
		window.speechSynthesis.onvoiceschanged = finish;
		window.setTimeout(finish, 250);
	});
}

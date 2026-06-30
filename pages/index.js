import dynamic from "next/dynamic";
import Head from "next/head";
import Main from "../components/Main";
import {
	SITE_URL,
	SITE_NAME,
	PERSON,
	homeMeta,
	absoluteUrl,
	homeJsonLd,
} from "../lib/seo";

const AIChat = dynamic(() => import("../components/AIChat"), { ssr: false });
const About = dynamic(() => import("../components/About"));
const Skills = dynamic(() => import("../components/Skills"));
const SkillsProgress = dynamic(() => import("../components/SkillCategory"));
const Timeline = dynamic(() => import("../components/ExperienceTimeLine"));
const Projects = dynamic(() => import("../components/Projects"));
const AISection = dynamic(() => import("../components/AISection"));
const CertificateShowcase = dynamic(() =>
	import("../components/CertificateShowCase"),
);
const CoursePromo = dynamic(() => import("../components/CoursePromo"));
const TelegramPromo = dynamic(() => import("../components/TelegramPromo"));
const MediumBlog = dynamic(() => import("../components/MeduimBlog"));
const Contact = dynamic(() => import("../components/Contact"));

const canonicalUrl = `${SITE_URL}/`;

export default function Home() {
	const ogImage = absoluteUrl(homeMeta.ogImagePath);
	const jsonLd = homeJsonLd();

	return (
		<>
			<Head>
				<title>{homeMeta.title}</title>
				<meta name="description" content={homeMeta.description} />
				<meta name="keywords" content={homeMeta.keywords.join(", ")} />
				<meta name="author" content={PERSON.name} />
				<meta name="publisher" content={PERSON.name} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#0f172a" />
				<meta
					name="subject"
					content="ERP, HCM, CRM & Full Stack Developer Ethiopia — Nahom Tesfaye"
				/>
				<meta
					name="classification"
					content="ERP Software, HCM Software, CRM, Web Development, Portfolio Websites, Ethiopia"
				/>
				<meta name="coverage" content="Ethiopia, Addis Ababa, Worldwide" />
				<meta name="target" content="employers, recruiters, clients, Ethiopia tech" />
				<link rel="author" href={PERSON.linkedin} />
				<link rel="me" href={PERSON.github} />
				<link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />

				<meta name="geo.region" content="ET-AA" />
				<meta name="geo.placename" content="Addis Ababa, Ethiopia" />
				<meta name="geo.position" content="9.145;38.7613" />
				<meta name="ICBM" content="9.145, 38.7613" />

				<link rel="canonical" href={canonicalUrl} />
				<link rel="icon" href="/favicon.ico" />

				<meta
					name="robots"
					content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
				/>
				{process.env.NEXT_PUBLIC_BING_VERIFY ? (
					<meta
						name="msvalidate.01"
						content={process.env.NEXT_PUBLIC_BING_VERIFY}
					/>
				) : null}
				{process.env.NEXT_PUBLIC_GOOGLE_VERIFY ? (
					<meta
						name="google-site-verification"
						content={process.env.NEXT_PUBLIC_GOOGLE_VERIFY}
					/>
				) : null}

				<meta property="og:type" content="website" />
				<meta property="og:locale" content="en_ET" />
				<meta property="og:locale:alternate" content="en_US" />
				<meta property="profile:first_name" content="Nahom" />
				<meta property="profile:last_name" content="Tesfaye" />
				<meta property="profile:username" content="nahomjc" />
				<meta property="og:site_name" content={SITE_NAME} />
				<meta property="og:title" content={homeMeta.title} />
				<meta property="og:description" content={homeMeta.description} />
				<meta property="og:url" content={canonicalUrl} />
				<meta property="og:image" content={ogImage} />
				<meta
					property="og:image:alt"
					content={`${PERSON.name}, ${PERSON.jobTitle}`}
				/>

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={homeMeta.title} />
				<meta name="twitter:description" content={homeMeta.description} />
				<meta name="twitter:image" content={ogImage} />
				<meta name="twitter:creator" content="@nahomjc" />

				<meta name="ai-content-declaration" content="human-authored portfolio" />

				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</Head>

			<main className="relative min-h-screen overflow-x-clip">
				<Main />
				<AIChat />
				<About />
				<Skills />
				<SkillsProgress />
				<Timeline />
				<Projects />
				<AISection />
				<CertificateShowcase />
				<CoursePromo />
				<TelegramPromo />
				<MediumBlog />
				<Contact />
			</main>
		</>
	);
}

import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import {
	SITE_URL,
	PERSON,
	resumeMeta,
	absoluteUrl,
	resumeJsonLd,
	faqJsonLd,
} from "../lib/seo";

const ResumeTerminal = dynamic(() => import("../components/ResumeTerminal"), {
	ssr: false,
});

const resume = () => {
	const canonicalUrl = `${SITE_URL}/resume`;

	return (
		<>
			<Head>
				<title>{resumeMeta.title}</title>
				<meta name="description" content={resumeMeta.description} />
				<meta name="keywords" content={resumeMeta.keywords.join(", ")} />
				<meta name="author" content={PERSON.name} />
				<link rel="canonical" href={canonicalUrl} />
				<link rel="icon" href="/LogNah.png" />
				<link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
				<meta name="theme-color" content="#06030c" />
				<meta name="geo.region" content="ET-AA" />
				<meta name="geo.placename" content="Addis Ababa, Ethiopia" />
				<meta
					name="robots"
					content="index, follow, max-image-preview:large, max-snippet:-1"
				/>
				<meta property="og:type" content="profile" />
				<meta property="og:title" content={resumeMeta.title} />
				<meta property="og:description" content={resumeMeta.description} />
				<meta property="og:url" content={canonicalUrl} />
				<meta property="og:locale" content="en_ET" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify([resumeJsonLd(), faqJsonLd()]),
					}}
				/>
			</Head>
			<ResumeTerminal />
		</>
	);
};

export default resume;

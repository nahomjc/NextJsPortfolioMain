import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const ResumeTerminal = dynamic(() => import("../components/ResumeTerminal"), {
	ssr: false,
});

const resume = () => {
	return (
		<>
			<Head>
				<title>Nahom | Resume — Terminal</title>
				<meta
					name="description"
					content="Full Stack Web Engineer resume — experience, skills, and education rendered in a futuristic terminal interface."
				/>
				<link rel="icon" href="/LogNah.png" />
				<meta name="theme-color" content="#06030c" />
			</Head>
			<ResumeTerminal />
		</>
	);
};

export default resume;

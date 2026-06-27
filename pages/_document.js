import { Html, Head, Main, NextScript } from "next/document";
import { homeMeta, SITE_NAME } from "../lib/seo";

export default function Document() {
	return (
		<Html lang="en-ET" className="dark">
			<Head>
				<meta charSet="utf-8" />
				<title>{homeMeta.title}</title>
				<meta name="description" content={homeMeta.description} />
				<meta name="application-name" content={SITE_NAME} />
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, viewport-fit=cover"
				/>
				<meta name="theme-color" content="#000000" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="black-translucent"
				/>
				<link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

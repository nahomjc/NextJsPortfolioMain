import ProjectDetailLayout from "../components/project-detail/ProjectDetailLayout";

const TECH = ["React", "JavaScript", "Firebase", "CoinGecko API"];

export default function Crypto() {
	return (
		<ProjectDetailLayout
			title="Crypto App"
			stack="React · Tailwind · Firebase · CoinGecko API"
			hero="/assets/projects/crypto.jpg"
			heroAlt="Cryptocurrency search app"
			technologies={TECH}
			eyebrow="Sandbox dossier · S04"
			pkgCode="S4"
			variant="sandbox"
			demoUrl="https://crypto-currency-search.web.app/"
			codeUrl="https://github.com/nahomjc/Cryptocurrency-API---Multi-Page-App-With-React-Router-DOM"
			overview={
				<p>
					Built to demonstrate React and API integration using the CoinGecko API.
					Supports Firebase authentication — users can sign in and save coins to a
					personal list via Firestore. Includes dynamic routing through React
					Router DOM.
				</p>
			}
		/>
	);
}

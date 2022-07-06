import Head from "next/head";

import Footer from "@Components/Footer";
import Header from "@Components/Header";

const Layout = ({ children }: any) => {
	let title = "Turbo Board";

	if (children?.props?.page_title) {
		title += ` | ${children?.props?.page_title}`;
	}

	return (
		<>
			<Head>
				<title>{title}</title>

				{/* Facebook */}
				<meta property="og:type" content="website" />
				<meta property="og:title" content={title} />
				<meta property="og:description" content="Create, share and fund game bounties." />
				<meta property="og:image" content="https://turboboard.io/meta.jpg" />

				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@TurboBoardIO" />
				<meta name="twitter:title" content="Turbo Board - Video Game Bounties" />
				<meta name="twitter:description" content="Create, share and fund game bounties." />
				<meta name="twitter:image" content="https://turboboard.io/meta.jpg" />

				{/* Icons */}
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#660099" />
				<meta name="msapplication-TileColor" content="#660099" />
				<meta name="theme-color" content="#660099" />
			</Head>

			<Header />

			<main className="main" role="main">
				{children}
			</main>

			<Footer />
		</>
	);
};

export default Layout;

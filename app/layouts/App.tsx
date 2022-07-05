import { ReactNode } from "react";

type Props = {
	children?: ReactNode;
};

import Head from "next/head";

import Footer from "@Components/Footer";
import Header from "@Components/Header";

const Layout = ({ children }: Props) => {
	let title = "Turbo Board";

	return (
		<>
			<Head>
				<title>{title}</title>
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

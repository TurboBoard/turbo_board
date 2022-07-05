import type { AppProps } from "next/app";

import { useEffect } from "react";

import { useRouter } from "next/router";

import { UserProvider } from "@auth0/nextjs-auth0";

import Layout from "@Layouts/App";

import { blur } from "@Utilities";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = () => {
			blur();
		};

		router.events.on("routeChangeStart", handleRouteChange);

		return () => {
			router.events.off("routeChangeStart", handleRouteChange);
		};
	}, [router.events]);

	return (
		<UserProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</UserProvider>
	);
}

export default MyApp;

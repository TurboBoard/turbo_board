import Link from "next/link";

import Discord from "@Svgs/Discord";
import Envelope from "@Svgs/Envelope";
import Logo from "@Svgs/Logo";
// import Patreon from "@Svgs/Patreon";
import ThemeToggle from "@Components/ThemeToggle";
import Twitter from "@Svgs/Twitter";

const Footer = () => (
	<footer className="bg-primary">
		<div className="h-10 bg-body divider-left-up" />

		<div className="relative container py-5 lg:pb-10">
			<Link href="/">
				<a className="block h-10 mb-5 hover:opacity-75 focus:opacity-75">
					<Logo />
				</a>
			</Link>

			<div className="flex space-x-2.5 lg:space-x-5 mb-5 lg:mb-10">
				{/*
					<a className="block h-5 text-light hover:text-secondary" href="#" rel="noreferrer" target="_blank">
						<Patreon />
					</a>
				*/}

				<a className="block h-5 text-light hover:text-secondary" href="https://twitter.com/TurboBoardIO" rel="noreferrer" target="_blank">
					<Twitter />
				</a>

				<a className="block h-5 text-light hover:text-secondary" href="https://discord.gg/7cZvW3AZ7M" rel="noreferrer" target="_blank">
					<Discord />
				</a>

				<a className="block h-5 text-light hover:text-secondary" href="mailto:admin@turboboard.io?subject=Hi" rel="noreferrer" target="_blank">
					<Envelope />
				</a>
			</div>

			<ul className="sm:flex space-y-2.5 sm:space-y-0 sm:space-x-5">
				{[
					// { slug: "about", text: "About" },
					{
						slug: "privacy",
						text: "Privacy Policy",
					},
					{
						slug: "terms",
						text: "Terms & Conditions",
					},
				].map(({ slug, text }) => (
					<li key={slug}>
						<Link href={`/page/${slug}`}>
							<a className="text-light hover:text-secondary">{text}</a>
						</Link>
					</li>
				))}
			</ul>

			<div className="absolute bottom-5 lg:bottom-10 right-10">
				<ThemeToggle />
			</div>
		</div>
	</footer>
);

export default Footer;

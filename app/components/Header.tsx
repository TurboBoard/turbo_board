import Link from "next/link";

import { useUser } from "@auth0/nextjs-auth0";

import Logo from "@Svgs/Logo";
import User from "@Svgs/User";

const Header = () => {
	const { user } = useUser();

	return (
		<header className="bg-hero dark:bg-hero-dark bg-cover bg-fixed">
			<nav className="container flex items-center space-x-5 md:space-x-10 py-5">
				<Link href="/">
					<a className="h-5 md:h-10 hover:opacity-75 focus:opacity-75">
						<Logo />
					</a>
				</Link>

				{[
					{ href: "/bounties", text: "Bounties" },
					// { href: "/events", text: "Events" },
				].map(({ href, text }) => (
					<Link key={href} href={href}>
						<a className="header-link">
							<span className="header-link__top">{text}</span>

							<span className="header-link__bottom">{text}</span>
						</a>
					</Link>
				))}

				<div className="flex-1 flex justify-end space-x-5">
					{user ? (
						<Link href="/account">
							<a className="h-6 text-primary hover:text-secondary focus:text-secondary">
								<User />
							</a>
						</Link>
					) : (
						<a className="button button--outline" href="/api/auth/login">
							Sign Up / Login
						</a>
					)}
				</div>
			</nav>

			<div className="h-5 md:h-10 bg-body divider-left-down" />
		</header>
	);
};

export default Header;

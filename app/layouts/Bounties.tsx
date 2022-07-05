import Bounties from "@Components/Bounties";
import Search from "@Components/forms/Search";

import { BountyData, GameData } from "@Types";

const Layout = ({ items }: { items: { bounty: BountyData; game: GameData }[] }) => (
	<div className="container py-10 lg:py-20">
		<h2 className="mb-5 text-center text-accent">Game Search</h2>

		<div className="mb-10 lg:mb-20">
			<Search />
		</div>

		<h2 className="mb-5 text-center text-accent">Latest Bounties</h2>

		<Bounties items={items} />
	</div>
);

export default Layout;

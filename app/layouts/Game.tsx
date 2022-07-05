import Link from "next/link";

import Bounties from "@Components/Bounties";
import Game from "@Components/Game";

import { BountyData, GameData } from "@Types";

const Layout = ({ game, items }: { game: GameData; items: { bounty: BountyData; game: GameData }[] }) => (
	<div className="container py-10 lg:py-20">
		<div className="mb-10 lg:mb-20">
			<Game {...game} />
		</div>

		<h2 className="mb-5 text-center text-accent">Bounties</h2>

		<div className="mb-10">{!items ? <p className="text-center">There are currently no bounties for this game.</p> : <Bounties items={items} />}</div>

		<Link href={`/create/${game.id}`}>
			<a className="button button--full w-full">Create {game.name} Bounty</a>
		</Link>
	</div>
);

export default Layout;

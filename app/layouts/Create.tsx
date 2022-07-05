import { useState } from "react";

import Create from "@Components/Create";
import Game from "@Components/Game";
import Loading from "@Components/Loading";

import { GameData } from "@Types";

const Layout = ({ game }: { game: GameData }) => {
	const [is_loading, set_is_loading] = useState<boolean>(false);

	if (is_loading) return <Loading text="Generating Bounty" />;

	return (
		<div className="container py-10 lg:py-20">
			<div className="mb-10 lg:mb-20">
				<Game {...game} />
			</div>

			<Create game={game} set_is_loading={set_is_loading} />
		</div>
	);
};

export default Layout;

import { useState } from "react";

import Bounty from "@Components/Bounty";
import Delete from "@Components/Delete";
import Game from "@Components/Game";
import Loading from "@Components/Loading";
import User from "@Components/User";

import { BountyData, GameData, UserData } from "@Types";

const Layout = ({ bounty, game, user }: { bounty: BountyData; game: GameData; user: UserData }) => {
	const [is_loading, set_is_loading] = useState<boolean>(false);

	if (is_loading) return <Loading text="Deleting Bounty" />;

	return (
		<div className="container py-10 lg:py-20">
			<div className="mb-10 lg:mb-20">
				<Game {...game} />
			</div>

			<div className="md:flex md:justify-between space-y-10 md:space-y-0">
				<div className="md:w-3/4">
					<Bounty {...bounty} />
				</div>

				<div>
					<User {...user} />
				</div>
			</div>

			<div className="lg:w-1/4">
				<Delete bounty_id={bounty.id} set_is_loading={set_is_loading} />
			</div>
		</div>
	);
};

export default Layout;

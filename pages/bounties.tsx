import { bounty_data, meta_data, game_data } from "@Helpers";

import { BountyData, GameData, MetaData } from "@Types";

import Layout from "@Layouts/Bounties";

const Page = (props: any) => {
	if (Object.keys(props).length === 0) return null;

	return <Layout {...props} />;
};

export async function getStaticProps() {
	const bounties = await bounty_data.latest();

	const items = [];

	for (const { bounty, game_id } of bounties.slice(0, 10)) {
		const game: GameData = await game_data.get(game_id);

		let item = {
			bounty,
			game,
		};

		const meta = await meta_data.bounty(bounty.id);

		if (meta) {
			item.bounty.meta = meta;
		}

		items.push({
			bounty,
			game,
		});
	}

	return {
		props: {
			items,
			page_title: "Latest Bounties",
		},
		revalidate: 1,
	};
}

export default Page;

import { bounty_data, meta_data, game_data } from "@Helpers";

import { BountyData, GameData } from "@Types";

import Layout from "@Layouts/Game";

const Page = (props: any) => {
	if (Object.keys(props).length === 0) return null;

	return <Layout {...props} />;
};

export async function getStaticProps({ params }: { params: { igdb_id: number } }) {
	try {
		const game = await game_data.get(params.igdb_id);

		const bounties = await bounty_data.game(game.id);

		if (!bounties) {
			return {
				props: {
					game,
					items: null,
				},
				revalidate: 1,
			};
		}

		const items: {
			bounty: BountyData;
			game: GameData;
		}[] = [];

		for (const bounty of bounties) {
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
				game,
				items,
				page_title: `${game.name} Bounties`,
			},
			revalidate: 1,
		};
	} catch (err) {
		console.log("Error:", err);

		return {
			props: {},
			revalidate: 1,
		};
	}
}

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true,
	};
}

export default Page;

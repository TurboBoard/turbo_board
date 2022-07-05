import { bounty_data, game_data, meta_data, user_data } from "@Helpers";

import { BountyData, GameData, UserData } from "@Types";

import Layout from "@Layouts/Bounty";

const Page = (props: any) => {
	if (Object.keys(props).length === 0) return null;

	return <Layout {...props} />;
};

export async function getStaticProps({ params }: { params: { bounty_id: string } }) {
	try {
		const { bounty, game_id, user_id } = await bounty_data.get(params.bounty_id);

		const game: GameData = await game_data.get(game_id);
		const user: UserData = await user_data.get(user_id);

		const item = {
			bounty,
			game,
			user,
		};

		const meta = await meta_data.bounty(bounty.id);

		if (meta) {
			item.bounty.meta = meta;
		}

		return {
			props: {
				...item,
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

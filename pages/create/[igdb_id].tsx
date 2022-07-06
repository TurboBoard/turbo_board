import { game_data } from "@Helpers";

import Layout from "@Layouts/Create";

const Page = (props: any) => {
	if (Object.keys(props).length === 0) return null;

	return <Layout {...props} />;
};

export async function getStaticProps({ params }: { params: { igdb_id: number } }) {
	const game = await game_data.get(params.igdb_id);

	if (!game) {
		return {
			props: {},
			revalidate: 1,
		};
	}

	return {
		props: {
			game,
			page_title: `Create ${game.name} Bounty`,
		},
		revalidate: 1,
	};
}

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true,
	};
}

export default Page;

import { useRouter } from "next/router";

import Form from "@Components/forms/create/Create";

import { CreateData, GameData } from "@Types";

const create_new_bounty = async (create_data: CreateData) => {
	const response = await fetch(`/api/bounty_data/create`, {
		method: "POST",
		body: JSON.stringify({
			create_data,
		}),
	});

	const json = await response.json();

	if (!json.new_bounty_id) return null;

	return json.new_bounty_id;
};

const Create = ({ game, set_is_loading }: { game: GameData; set_is_loading: Function }) => {
	const router = useRouter();

	const create_bounty = async (create_data: CreateData) => {
		set_is_loading(true);

		const new_bounty_id: string | null = await create_new_bounty(create_data);

		if (!new_bounty_id) {
			set_is_loading(false);

			return;
		}

		router.push({
			pathname: "/bounty/[bounty_id]",
			query: { bounty_id: new_bounty_id },
		});
	};

	return (
		<div>
			<h2 className="mb-5 text-accent">Create Bounty</h2>

			<Form create_bounty={create_bounty} game={game} />
		</div>
	);
};

export default Create;

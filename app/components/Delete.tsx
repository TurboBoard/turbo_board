import { useRouter } from "next/router";

import Form from "@Components/forms/Delete";

import { BountyData } from "@Types";

const del = async (bounty_id: BountyData["id"]) => {
	const response = await fetch(`/api/bounty_data/delete`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ bounty_id }),
	});

	const json = await response.json();

	if (!json.success) return false;

	return json.success;
};

const Delete = ({ bounty_id, set_is_loading }: { bounty_id: BountyData["id"]; set_is_loading: Function }) => {
	const router = useRouter();

	const delete_bounty = async () => {
		set_is_loading(true);

		const success = await del(bounty_id);

		if (!success) {
			set_is_loading(false);

			return;
		}

		router.push("/bounties");
	};

	return (
		<div className="mt-10">
			<Form bounty_id={bounty_id} delete_bounty={delete_bounty} />
		</div>
	);
};

export default Delete;

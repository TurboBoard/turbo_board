import { useEffect, useState } from "react";

import { BountyData } from "@Types";

const get_is_admin = async (bounty_id: BountyData["id"], set_is_admin: Function) => {
	const response = await fetch(`/api/bounty_data/is_admin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ bounty_id }),
	});

	const json = await response.json();

	if (json.is_admin === true) {
		set_is_admin(json.is_admin);
	}
};

const Delete = ({ bounty_id, delete_bounty }: { bounty_id: BountyData["id"]; delete_bounty: Function }) => {
	const [is_admin, set_is_admin] = useState<boolean>(false);

	useEffect(() => {
		get_is_admin(bounty_id, set_is_admin);
	}, []);

	const handle_submit = async (e: any) => {
		e.preventDefault();

		delete_bounty();
	};

	if (!is_admin) return null;

	return (
		<form onSubmit={handle_submit}>
			<button className="button button--full" type="submit">
				Delete Bounty
			</button>
		</form>
	);
};

export default Delete;

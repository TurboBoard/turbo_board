import { NextApiRequest, NextApiResponse } from "next";

import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

import { bounty_data, meta_data, user_data } from "@Helpers";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = getSession(_req, res);

		const user_id = session?.user.user_id;

		if (!user_id) {
			throw new Error("User ID Not Found");
		}

		const { create_data } = JSON.parse(_req.body);

		const new_bounty_id: string = await bounty_data.create(user_id, create_data);

		if (!new_bounty_id) {
			throw new Error("Failed to generate Bounty");
		}

		await meta_data.create(new_bounty_id, create_data.meta);

		res.status(200).json({ new_bounty_id });
	} catch (err: any) {
		console.log("err", err);
		res.status(500).json({ statusCode: 500, message: err.message });
	}
};

export default withApiAuthRequired(handler);

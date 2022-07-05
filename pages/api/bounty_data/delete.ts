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

		const { bounty_id } = _req.body;

		await bounty_data.del(bounty_id);

		await meta_data.del(bounty_id);

		res.status(200).json({ success: true });
	} catch (err: any) {
		console.log("err", err);
		res.status(500).json({ statusCode: 500, message: err.message });
	}
};

export default withApiAuthRequired(handler);

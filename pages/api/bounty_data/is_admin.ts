import { NextApiRequest, NextApiResponse } from "next";

import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

import { bounty_data } from "@Helpers";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = getSession(_req, res);

		const user_id = session?.user.user_id;

		if (!user_id) {
			res.status(200).json({ is_admin: false });

			return;
		}

		const is_admin = await bounty_data.is_admin(_req.body.bounty_id, user_id);

		res.status(200).json({ is_admin });
	} catch (err: any) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
};

export default withApiAuthRequired(handler);

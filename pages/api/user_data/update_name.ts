import { NextApiRequest, NextApiResponse } from "next";

import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

import { user_data } from "@Helpers";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = getSession(_req, res);

		const user_id = session?.user.user_id;

		if (!user_id) {
			throw new Error("User ID Not Found");
		}

		const success = await user_data.update(user_id, _req.body.new_user_name);

		res.status(200).json({ success });
	} catch (err: any) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
};

export default withApiAuthRequired(handler);

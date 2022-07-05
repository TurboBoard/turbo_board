// @ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";

import { handleAuth, handleCallback, handleLogin } from "@auth0/nextjs-auth0";

import { user_data } from "@Helpers";

const afterCallback = async (_req: NextApiRequest, res: NextApiResponse, session) => {
	const user_id = await user_data.get_id_by_sub(session.user.sub);

	if (user_id) {
		session.user.user_id = user_id;

		return session;
	}

	const new_user_id = await user_data.create(session.user);

	session.user.user_id = new_user_id;

	return session;
};

export default handleAuth({
	async callback(_req, res) {
		try {
			await handleCallback(_req, res, { afterCallback });
		} catch (error) {
			res.status(error.status || 500).end(error.message);
		}
	},
	async login(_req, res) {
		await handleLogin(_req, res, {
			returnTo: _req.headers.referer,
		});
	},
});

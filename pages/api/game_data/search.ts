import { NextApiRequest, NextApiResponse } from "next";

import { game_data } from "@Helpers";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		const games = await game_data.search(_req.body);

		res.status(200).json({ games });
	} catch (err: any) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
};

export default handler;

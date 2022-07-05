import { NextApiRequest, NextApiResponse } from "next";

import { meta_data } from "@Helpers";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		const options = await meta_data.options();

		res.status(200).json({ options });
	} catch (err: any) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
};

export default handler;

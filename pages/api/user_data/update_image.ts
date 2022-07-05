import { NextApiRequest, NextApiResponse } from "next";

import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

import multiparty from "multiparty";

import { user_data } from "@Helpers";

export const config = {
	api: {
		bodyParser: false,
	},
};

const parse_form = (_req: NextApiRequest) =>
	new Promise((resolve, reject) => {
		const form = new multiparty.Form();

		form.parse(_req, (err, fields, files) => {
			if (err) return reject(err);

			const image = files.image[0];
			const old_image_id = fields.old_image_id[0];

			return resolve({ image, old_image_id });
		});
	});

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = getSession(_req, res);

		const user_id = session?.user.user_id;

		if (!user_id) {
			throw new Error("User ID Not Found");
		}

		const data: any = await parse_form(_req);

		const new_image_id = await user_data.update_image(user_id, data);

		res.status(200).json({ new_image_id });
	} catch (err: any) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
};

export default withApiAuthRequired(handler);

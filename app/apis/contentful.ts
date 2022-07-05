// @ts-nocheck
import { createClient } from "contentful";

const contentful = createClient({
	space: process.env.CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
	host: process.env.CONTENTFUL_HOST,
});

export default contentful;

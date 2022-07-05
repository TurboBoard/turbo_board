import { GameData } from "@Types";

import { regions } from "@Data";

type igdb_game = {
	cover?: { url: string };
	id: number;
	first_release_date: number;
	involved_companies?: { id: number; company: { id: number; name: string } }[];
	name: string;
	platforms: { id: number; name: string }[];
	release_dates: { id: number; region: number }[];
};

/* ==========
	Private
========== */
const parse_game_data = ({ cover, id, first_release_date, involved_companies, name, platforms, release_dates }: igdb_game) => ({
	companies: involved_companies ? involved_companies.map(({ company }) => company).sort((a, b) => a.name.localeCompare(b.name)) : undefined,
	cover: cover ? `https:${cover.url.replace("/t_thumb/", "/t_cover_big/")}` : "https://images.turboboard.io/chrong.jpg",
	id,
	name,
	platforms: platforms.map((platform) => platform).sort((a, b) => a.name.localeCompare(b.name)),
	released: new Date(first_release_date * 1000).getFullYear(),
	regions: release_dates
		.reduce((acc, { region }) => {
			if (acc.includes(region)) return acc;

			acc.push(region);

			return acc;
		}, [] as number[])
		.map((region) => ({
			id: region,
			name: regions[region],
		}))
		.sort((a, b) => a.name.localeCompare(b.name)),
});

/* ==========
	Public
========== */
const get = async (game_id: number) => {
	const headers: HeadersInit = new Headers();

	headers.set("x-api-key", process.env.API_GATEWAY_KEY);

	const response = await fetch(`${process.env.IGDB_URL}/games`, {
		method: "POST",
		headers,
		body: `fields cover.url,first_release_date,involved_companies.company.name,name,platforms.name,release_dates.region; where id = ${game_id};`,
	});

	const json = await response.json();

	const game: GameData = parse_game_data(json[0]);

	return game;
};

const search = async ({ query }: { query: string }) => {
	const headers: HeadersInit = new Headers();

	headers.set("x-api-key", process.env.API_GATEWAY_KEY);

	const response = await fetch(`${process.env.IGDB_URL}/games`, {
		method: "POST",
		headers,
		body: `search "${query}"; fields cover.url,first_release_date,involved_companies.company.name,name,platforms.name,release_dates.region; limit 5; where version_parent = null & first_release_date != null;`,
	});

	const json = await response.json();

	const games: GameData[] = json.map((data: igdb_game) => parse_game_data(data)).sort((a: GameData, b: GameData) => a.released - b.released);

	return games;
};

export default { get, search };

import { nanoid } from "nanoid";

import aws from "@Apis/aws";

import { BountyData, CreateData, GameData, UserData } from "@Types";

import { platforms, regions } from "@Data";

const TableName = "TurboBoardV2Bounties";

type BountyItem = {
	bounty_id: any;
	created_at: any;
	emulator: any;
	game_id: any;
	platform_id?: any;
	region_id?: any;
	score_to_beat?: any;
	time_to_beat?: any;
	tool?: any;
	trick?: any;
	user_id: any;
	type: any;
};

/* ==========
	Private
========== */
const get_item = async (bounty_id: BountyData["id"]) => {
	const { Item } = await aws.dynamo.get_item({
		TableName,
		Key: {
			bounty_id: aws.dynamo.input(bounty_id),
		},
	});

	if (!Item) {
		throw new Error("Bounty Item was not found");
	}

	const { game_id, user_id } = aws.dynamo.unmarshall(Item);

	// @ts-ignore
	const bounty = parse_bounty_item(Item);

	return { bounty, game_id, user_id };
};

const parse_bounty_item = (Item: BountyItem) => {
	const { bounty_id, created_at, emulator, platform_id, region_id, score_to_beat, time_to_beat, tool, trick, type } = aws.dynamo.unmarshall(Item);

	const bounty: BountyData = {
		created_at: new Date(created_at).getTime(),
		emulator,
		id: bounty_id,
		requirements: {},
		type,
	};

	if (platform_id) {
		bounty.platform = {
			id: platform_id,
			name: platforms[platform_id],
		};
	}

	if (region_id) {
		bounty.region = {
			id: region_id,
			name: regions[region_id],
		};
	}

	if (type === "score") {
		bounty.requirements.score_to_beat = score_to_beat;
	}

	if (type === "time") {
		bounty.requirements.time_to_beat = time_to_beat;
	}

	if (type === "tool") {
		bounty.requirements.tool = tool;
	}

	if (type === "trick") {
		bounty.requirements.trick = trick;
	}

	return bounty;
};

/* ==========
	Public
========== */
const create = async (user_id: UserData["id"], create_data: CreateData) => {
	const new_bounty_id = nanoid();

	const created_at = new Date().getTime();

	const { emulator, game_id, platform_id, requirements, region_id, type } = create_data;

	// TODO: Find out how to import AttributeValue and use that instead of any
	let Item: BountyItem = {
		bounty_id: aws.dynamo.input(new_bounty_id),
		created_at: aws.dynamo.input(created_at),
		emulator: aws.dynamo.input(emulator),
		game_id: aws.dynamo.input(game_id),
		user_id: aws.dynamo.input(user_id),
		type: aws.dynamo.input(type),
	};

	if (platform_id) {
		Item.platform_id = aws.dynamo.input(platform_id);
	}

	if (region_id) {
		Item.region_id = aws.dynamo.input(region_id);
	}

	if (type === "score") {
		Item.score_to_beat = aws.dynamo.input(requirements.score_to_beat);
	}

	if (type === "time") {
		Item.time_to_beat = aws.dynamo.input(requirements.time_to_beat);
	}

	if (type === "tool") {
		Item.tool = aws.dynamo.input(requirements.tool);
	}

	if (type === "trick") {
		Item.trick = aws.dynamo.input(requirements.trick);
	}

	await aws.dynamo.put_item({
		TableName,
		Item,
	});

	return new_bounty_id;
};

const del = async (bounty_id: BountyData["id"]) =>
	await aws.dynamo.delete_item({
		TableName,
		Key: {
			bounty_id: aws.dynamo.input(bounty_id),
		},
	});

const game = async (game_id: GameData["id"]) => {
	const { Items } = await aws.dynamo.scan({
		TableName,
		FilterExpression: "game_id = :game_id",
		ExpressionAttributeValues: {
			":game_id": aws.dynamo.input(game_id),
		},
	});

	if (!Items?.length) return null;

	const bounties: BountyData[] = Items.map((Item: any) => ({
		...parse_bounty_item(Item),
	})).sort((a, b) => b.created_at - a.created_at);

	return bounties;
};

const get = async (bounty_id: BountyData["id"]) => get_item(bounty_id);

const is_admin = async (bounty_id: BountyData["id"], user_id: UserData["id"]) => {
	const item = await get_item(bounty_id);

	return item.user_id === user_id;
};

const latest = async () => {
	const { Items } = await aws.dynamo.scan({
		TableName,
	});

	if (!Items?.length) {
		throw new Error("Could not retrieve latest bounties");
	}

	const bounties: { bounty: BountyData; game_id: GameData["id"] }[] = Items.map((Item: any) => {
		const { game_id } = aws.dynamo.unmarshall(Item);

		return {
			bounty: parse_bounty_item(Item),
			game_id,
		};
	}).sort((a, b) => b.bounty.created_at - a.bounty.created_at);

	return bounties;
};

export default { create, del, game, get, is_admin, latest };

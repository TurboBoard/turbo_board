import fs from "fs";

import { nanoid } from "nanoid";
import sharp from "sharp";

import aws from "@Apis/aws";

import { UserData } from "@Types";

const TableName = "TurboBoardV2Users";

/* ==========
	Private
========== */
const create_image = async (picture: string) => {
	const new_image_id = nanoid();

	const response = await fetch(picture);

	const arrayBuffer = await response.arrayBuffer();

	const buffer = Buffer.from(arrayBuffer);

	const Body = await sharp(buffer).resize(256).jpeg().toBuffer();

	await aws.s3.upload({
		Bucket: "turbo-board-user-images",
		Key: `${new_image_id}.jpg`,
		Body,
		ContentType: "image/jpeg",
	});

	return new_image_id;
};

/* ==========
	Public
========== */
const create = async ({ nickname, picture, sub }: { nickname: string; picture: string; sub: string }) => {
	const new_image_id = await create_image(picture);

	const new_user_id = nanoid();

	await aws.dynamo.put_item({
		TableName,
		Item: {
			image_id: aws.dynamo.input(new_image_id),
			user_id: aws.dynamo.input(new_user_id),
			user_name: aws.dynamo.input(nickname),
			user_sub: aws.dynamo.input(sub),
		},
	});

	return new_user_id;
};

const get = async (user_id: string) => {
	const { Item } = await aws.dynamo.get_item({
		TableName,
		Key: {
			user_id: {
				S: user_id,
			},
		},
	});

	if (!Item) {
		throw new Error("User was not found");
	}

	const { image_id, user_name } = aws.dynamo.unmarshall(Item);

	return {
		id: user_id,
		image_id,
		name: user_name,
	} as UserData;
};

const get_id_by_sub = async (user_sub: string) => {
	const { Items } = await aws.dynamo.scan({
		TableName,
		FilterExpression: "user_sub = :user_sub",
		ExpressionAttributeValues: {
			":user_sub": { S: user_sub },
		},
	});

	if (!Items?.length) return null;

	const { user_id } = aws.dynamo.unmarshall(Items[0]);

	return user_id;
};

const update = async (user_id: string, new_user_name: string) => {
	await aws.dynamo.update_item({
		TableName,
		Key: {
			user_id: aws.dynamo.input(user_id),
		},
		UpdateExpression: "set user_name = :v",
		ExpressionAttributeValues: {
			":v": aws.dynamo.input(new_user_name),
		},
	});

	return true;
};

const update_image = async (user_id: string, data: { image: any; old_image_id: string }) => {
	const file_content = fs.readFileSync(data.image.path);

	const buffer = await sharp(file_content).resize(256).jpeg().toBuffer();

	const new_image_id = nanoid();

	await aws.s3.upload({
		Bucket: "turbo-board-user-images",
		Key: `${new_image_id}.jpg`,
		Body: buffer,
		ContentType: "image/jpeg",
	});

	await aws.s3.delete({
		Bucket: "turbo-board-user-images",
		Key: `${data.old_image_id}.jpg`,
	});

	await aws.dynamo.update_item({
		TableName,
		Key: {
			user_id: aws.dynamo.input(user_id),
		},
		UpdateExpression: "set image_id = :v",
		ExpressionAttributeValues: {
			":v": aws.dynamo.input(new_image_id),
		},
	});

	return new_image_id;
};

export default { create, get, get_id_by_sub, update, update_image };

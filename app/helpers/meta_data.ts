import { nanoid } from "nanoid";

import aws from "@Apis/aws";

import { CreateData, BountyData, MetaData, Option } from "@Types";

type MetaItem = {
	meta_id: string;
	meta_name: string;
	parent_id?: string;
};

/* ==========
	Private
========== */
const get_meta = async (meta_id: MetaData["id"]) => {
	const { Item } = await aws.dynamo.get_item({
		TableName: "TurboBoardV2Meta",
		Key: {
			meta_id: aws.dynamo.input(meta_id),
		},
	});

	if (!Item) {
		throw new Error("Meta Item was not found");
	}

	return aws.dynamo.unmarshall(Item) as MetaItem;
};

/* ==========
	Public
========== */
const bounty = async (bounty_id: BountyData["id"]) => {
	const { Items } = await aws.dynamo.scan({
		TableName: "TurboBoardV2Lookup",
		FilterExpression: "bounty_id = :bounty_id",
		ExpressionAttributeValues: {
			":bounty_id": aws.dynamo.input(bounty_id),
		},
	});

	if (!Items?.length) return null;

	const meta: BountyData["meta"] = [];

	for (const Item of Items) {
		const { meta_id } = aws.dynamo.unmarshall(Item);

		const child = await get_meta(meta_id);

		if (!child.parent_id) {
			throw new Error("Child missing Parent");
		}

		const parent = await get_meta(child.parent_id);

		meta.push({
			key: {
				id: parent.meta_id,
				name: parent.meta_name,
			},
			value: {
				id: child.meta_id,
				name: child.meta_name,
			},
		});
	}

	return meta;
};

const create = async (new_bounty_id: BountyData["id"], meta: CreateData["meta"]) => {
	if (!meta) return true;

	const TurboBoardV2Meta = [];
	const TurboBoardV2Lookup = [];

	for (const { key, value } of meta) {
		/*==========
		 If both already exist then just add the child to the LookUp Table
		==========*/
		if (key.id !== "new" && value.id !== "new") {
			// Add Child to Lookup Table
			TurboBoardV2Lookup.push({
				PutRequest: {
					Item: {
						bounty_id: aws.dynamo.input(new_bounty_id),
						meta_id: aws.dynamo.input(value.id),
					},
				},
			});

			continue;
		}

		/*==========
		 If the parent exists but not the child
		==========*/
		if (key.id !== "new" && value.id === "new") {
			const new_value_id = nanoid();

			// Create the Child
			TurboBoardV2Meta.push({
				PutRequest: {
					Item: {
						meta_id: aws.dynamo.input(new_value_id),
						meta_name: aws.dynamo.input(value.name),
						parent_id: aws.dynamo.input(key.id),
					},
				},
			});

			// Add Child to Lookup Table
			TurboBoardV2Lookup.push({
				PutRequest: {
					Item: {
						bounty_id: aws.dynamo.input(new_bounty_id),
						meta_id: aws.dynamo.input(new_value_id),
					},
				},
			});

			continue;
		}

		/*==========
		 If the parent does not exist
		==========*/
		if (key.id === "new") {
			const new_key_id = nanoid();
			const new_value_id = nanoid();

			// Create the Parent and Child
			TurboBoardV2Meta.push(
				{
					PutRequest: {
						Item: {
							meta_id: aws.dynamo.input(new_key_id),
							meta_name: aws.dynamo.input(key.name),
						},
					},
				},
				{
					PutRequest: {
						Item: {
							meta_id: aws.dynamo.input(new_value_id),
							meta_name: aws.dynamo.input(value.name),
							parent_id: aws.dynamo.input(new_key_id),
						},
					},
				}
			);

			// Add Child to Lookup Table
			TurboBoardV2Lookup.push({
				PutRequest: {
					Item: {
						bounty_id: aws.dynamo.input(new_bounty_id),
						meta_id: aws.dynamo.input(new_value_id),
					},
				},
			});

			continue;
		}

		console.log("Debug:", key, value);
	}

	// Only write to Metadata if there is new metadata
	if (TurboBoardV2Meta.length) {
		await aws.dynamo.batch_write_items({
			RequestItems: {
				TurboBoardV2Meta,
			},
		});
	}

	await aws.dynamo.batch_write_items({
		RequestItems: {
			TurboBoardV2Lookup,
		},
	});

	return true;
};

const del = async (bounty_id: BountyData["id"]) => {
	const { Items } = await aws.dynamo.scan({
		TableName: "TurboBoardV2Lookup",
		FilterExpression: "bounty_id = :bounty_id",
		ExpressionAttributeValues: {
			":bounty_id": aws.dynamo.input(bounty_id),
		},
	});

	if (!Items) {
		throw new Error("Failed to retrieve Meta");
	}

	if (Items.length === 0) return;

	for (const { bounty_id, meta_id } of Items) {
		await aws.dynamo.delete_item({
			TableName: "TurboBoardV2Lookup",
			Key: {
				bounty_id,
				meta_id,
			},
		});
	}
};

const options = async () => {
	const { Items } = await aws.dynamo.scan({
		TableName: "TurboBoardV2Meta",
	});

	if (!Items) return null;

	const { keys, values } = Items.map((item) => aws.dynamo.unmarshall(item)).reduce(
		(acc, item) => {
			if (!item.parent_id) {
				acc.keys.push(item);

				return acc;
			}

			acc.values.push(item);

			return acc;
		},
		{
			keys: [] as MetaItem[],
			values: [] as MetaItem[],
		}
	);

	const options: Option[] = keys
		.map(({ meta_id, meta_name }: MetaItem) => {
			const children: Option[] = values
				.filter(({ parent_id }: MetaItem) => parent_id === meta_id)
				.map(({ meta_id, meta_name }: MetaItem) => ({
					label: meta_name,
					value: meta_id,
				}));

			return {
				children,
				label: meta_name,
				value: meta_id,
			} as Option;
		})
		.sort((a: Option, b: Option) => a.label.localeCompare(b.label));

	return options;
};

export default { bounty, create, del, options };

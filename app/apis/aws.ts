// @ts-nocheck
import AWS from "aws-sdk";

AWS.config.update({
	accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
	secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
	region: "us-east-1",
});

const dynamoDB = new AWS.DynamoDB();

const s3 = new AWS.S3();

export default {
	dynamo: {
		batch_write_items: async (params) => dynamoDB.batchWriteItem(params).promise(),
		delete_item: async (params) => dynamoDB.deleteItem(params).promise(),
		get_item: async (params) => dynamoDB.getItem(params).promise(),
		input: (value) => AWS.DynamoDB.Converter.input(value),
		marshall: (value) => AWS.DynamoDB.Converter.marshall(value),
		put_item: async (params) => dynamoDB.putItem(params).promise(),
		query: async (params) => dynamoDB.query(params).promise(),
		scan: async (params) => dynamoDB.scan(params).promise(),
		unmarshall: (item) => AWS.DynamoDB.Converter.unmarshall(item),
		update_item: async (params) => dynamoDB.updateItem(params).promise(),
	},
	s3: {
		delete: (params) => s3.deleteObject(params).promise(),
		upload: (params) => s3.upload(params).promise(),
	},
};

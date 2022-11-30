import AWS from 'aws-sdk';

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

export default async function (req, res) {
	const query = req.query;
    const { key } = query;

	AWS.config.update({
	    accessKeyId: process.env.S3_ACCESS_KEY_ID,
	    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
	    region: 'eu-west-2'
	});

	const s3 = new AWS.S3();

	const presignedGet = s3.getSignedUrl('getObject', {
		Key: `contractor-files/${key}`,
	    Bucket: "e2s-console",
	    Expires: 60 * 60,
	})

	res.status(200).json({url: presignedGet});
}
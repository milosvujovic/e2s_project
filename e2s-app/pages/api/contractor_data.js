import db from '../../db';

export default async function (req, res) {
	//Temp, this will be dynamically set from the users token.
	const companyId = "FED4FC15-ECC5-4957-A330-C1928448A2FE"

	let params = {
  	TableName: "Contractors",

  	KeyConditionExpression: 'companyId = :companyId',
  	ExpressionAttributeValues: {
			':companyId': companyId,
		}
  }

	await db.query(params, function (err, data) {
		if (err) {
	    console.log('Error', err);
	    res.status(500).end()
		} else {
	    // send the json response from the callback
	    res.status(200).json(data.Items);
		}
  });
}
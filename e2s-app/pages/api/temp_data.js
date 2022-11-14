import db from '../../db';

export default async function (req, res) {
	//This is here for testing, this would be set dynamically
	const businessName = "testcompany"

	const query = req.query;
    const { startTimestamp, endTimestamp } = query;

    if(startTimestamp == null || endTimestamp == null){
    	res.status(400).end("startTimestamp and endTimestamp query params must be provided")
    }

    if(startTimestamp >= endTimestamp){
    	res.status(400).end("startTimestamp and endTimestamp cannot be the same and endTimestamp must be larger than startTimestamp")
    }

    let params = {
    	TableName: "TimeSeriesData",
    	ExpressionAttributeValues: {
		':n': businessName+".temp",
		':startTimestamp' : parseInt(startTimestamp),
		':endTimestamp' : parseInt(endTimestamp)
		},
    	KeyConditionExpression: '#name = :n and #timestamp BETWEEN :startTimestamp and :endTimestamp',
    	ExpressionAttributeNames: { 
    		"#name": "name" , 
    		"#timestamp" : "timestamp",
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
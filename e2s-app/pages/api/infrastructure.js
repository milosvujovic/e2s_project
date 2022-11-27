import db from '../../db';

export default async function (req, res) {

    // filter API requests by method
    if (req.method === 'GET') {

        //This is here for testing, this would be set dynamically
        const businessName = "testcompany"

        const query = req.query;
        const {equipment} = query;

        let params;

        if(equipment == null){
            params = {
                TableName: "Infrastructure"
                }
            }

            await db.scan(params, function (err, data) {
                if (err) {
                    console.log('Error', err);
                    res.status(500).end()
                } else {
                    // send the json response from the callback
                    res.status(200).json(data.Items);
                }
            });

        }else{
            let params = {
                TableName: "Infrastructure",
                ExpressionAttributeValues: {
                    ':n': businessName + "." + equipment
                },
                KeyConditionExpression: '#name = :n',
                ExpressionAttributeNames: {
                    "#name": "name"
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





}
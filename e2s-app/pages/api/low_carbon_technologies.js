import db from '../../db';

export default async function (req, res) {

    // filter API requests by method
    if (req.method === 'GET') {

        let params = {
            TableName: "LowCarbonTechnologies"
        }

        await db.scan(params, function (err, data) {
            if (err) {
                console.log('Error', err);
                res.status(500).end()
                return
            } else {
                // send the json response from the callback
                res.status(200).json(data.Items);
                return
            }
        });
    }

}
import db from '../../db';

export default async function (req, res) {
    if (!req) {
        return
    }
    const body = req.body
    console.log('body: ', body)


// if (!body.type || !body.fig) {
//     return res.status(400).json({ data: 'Reading data not found' })
// }
    db.put(
        {
            "TableName": "TimeSeriesData",
            "Item": {
                "companyName": "testcompany",
                // "name": {"S": ""},
                "name": body.type,
                // "timestamp": {"N": ""},
                "timestamp": {"N": ""},
                // "value": {"N": ""}
                "value": body.value
            }
        }, function(result) {
            console.log(result);
        });
    console.log("Items are succesfully ingested in table ..................");

res.status(200).json({ data: `${body.type} ${body.fig}` })


}


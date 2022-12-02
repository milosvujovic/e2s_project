import db from '../../db';

export default async function (req, res) {

const body = req.body


console.log('body: ', body)


if (!body.type || !body.fig) {
    return res.status(400).json({ data: 'Reading data not found' })
}
    db.putItem(
        {
            "TableName": "TimeSeriesData",
            "Item": {
                "name": {"S": ""},
                "timestamp": {"N": ""},
                "value": {"N": ""}
            }
        }, function(result) {
            result.on('data', function(chunk) {
                console.log("" + chunk);
            });
        });
    console.log("Items are succesfully ingested in table ..................");

res.status(200).json({ data: `${body.type} ${body.fig}` })


}


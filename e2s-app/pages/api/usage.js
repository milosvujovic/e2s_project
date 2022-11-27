import db from '../../db';

export default async function (req, res) {

    // filter API requests by method
    if (req.method === 'GET') {

        //This is here for testing, this would be set dynamically
        const businessName = "testcompany"

        const query = req.query;
        const {startTimestamp, endTimestamp, IO, energyType , source , equipment} = query;

        if(startTimestamp == null || endTimestamp == null){
            res.status(400).end("startTimestamp and endTimestamp query params must be provided")
            return
        }

        if(equipment == null){
            res.status(400).end("The name of the equipment must be provided. Examples include chp, solar and ahu.")
            return
        }

        if(startTimestamp >= endTimestamp){
            res.status(400).end("startTimestamp and endTimestamp cannot be the same and endTimestamp must be larger than startTimestamp")
            return
        }

        if(IO == null){
            res.status(400).end("IO must be provided. Declare whether this is an input or output.")
            return
        }

        if(energyType == null){
            res.status(400).end("Energy type must be provided (e.g. gas, electricity, thermal etc.)")
            return
        }

        let primaryKeyValue;

        console.log("-------")
        console.log(IO)

        if(IO =="input"){
            primaryKeyValue = businessName + "." + IO + "." + energyType + "." + source + "." + equipment
        }else if(IO =="output"){
            primaryKeyValue = businessName + "." + IO + "." + energyType + "." + equipment
        }else{
            primaryKeyValue = null
        }


        console.log(primaryKeyValue)


        let params = {
            TableName: "TimeSeriesData",
            ExpressionAttributeValues: {
                ':n': primaryKeyValue,
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

    };




}
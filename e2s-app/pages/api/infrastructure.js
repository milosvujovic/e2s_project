import db from '../../db';

export default async function (req, res) {

    // filter API requests by method
    if (req.method === 'GET') {

        //This is here for testing, this would be set dynamically
        const businessName = "testcompany"

        const query = req.query;
        const {equipment, IO, energyType} = query;

        let params;

        if (equipment == null) {
            params = {
                TableName: "Infrastructure"
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

        }else {
            params = {
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
                    return
                } else {
                    // send the json response from the callback

                    console.log("Reached part 1")

                    if(IO == "input"){
                        console.log("Reached input")
                        res.status(200).json(inputs);

                    }else if (IO == "output"){
                        let outputs = data.Items[0]['outputDataSources']
                        outputs.forEach(function(dataSource){
                            if(dataSource['energyType'].toLowerCase() == energyType){
                                console.log(dataSource['energyType'])
                                res.status(200).json(dataSource);
                                return
                            }
                        })
                        res.status(200).json("No data source with energy type " + energyType + " found");
                        return
                    }else{
                        let inputs = data.Items[0]['inputDataSources']
                        inputs.forEach(function(dataSource){
                            if(dataSource['energyType'].toLowerCase() == energyType){
                                console.log(dataSource['energyType'])
                                res.status(200).json(dataSource);
                                return
                            }
                        })
                        res.status(200).json("No data source with energy type " + energyType + " found");
                        return
                    }

                    return


                }
            });

        }



    }

}
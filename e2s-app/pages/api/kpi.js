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

    const date = new Date(body.date);

    db.put(
        {
            "TableName": "KPIs",
            "Item": {
                "companyName": "testcompany",
                "kpiName":  body.name,
                "kpi_type": body.type,
                "kpi_description": body.description,
                "reachBy":  date.getTime()/1000,
                "targetValue": parseInt(body.target),
                "unit": body.unit,
                "unitIsPrefix": body.unitIsPrefix
            }
        }, function(result) {
            // result.on('data', function(chunk) {
            //     console.log("" + chunk);
            // });
            console.log(result);
        });
    console.log("Items are succesfully ingested in table ..................");

    res.status(200).json({ data: `${body.type} ${body.fig}` })

    return


}



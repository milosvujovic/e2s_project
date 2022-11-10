import db from "../db";

function DatabaseQuery(tableName, partitionKey) {
    const params = {
        TableName: 'Users',
        Key: {
            userId: id
        }
    };

    db.get(params, function (err, data) {
        if (err) {
            console.log('Error', err);
        } else {
            // send the json response from the callback
            res.json(data.Item);
        }
    });

    return <div>About</div>
}
import db from "../../db";

export default async function permission_groups(req, res) {
    const query = req.query;
    const { company } = query;
    
    if (req.method !== 'GET') {
        res.status(405).send({ message: 'Only GET requests allowed' })
        return
    }

    const body = req.body;

    if(company == null || company === ''){
        res.status(400).end("company must be provided")
    }

    let params = {
    	TableName: "PermissionGroups",
    	ExpressionAttributeValues: {
		':n': company
		},
    	KeyConditionExpression: '#name = :n',
    	ExpressionAttributeNames: { 
    		"#name": "companyName" , 
   		}
    }

    await db.query(params, async function (err, data) {
        if (err) {
            console.log('Error', err);
            res.status(500).end()
        } else {
            res.status(200).json(data.Items);
        }
    });
}
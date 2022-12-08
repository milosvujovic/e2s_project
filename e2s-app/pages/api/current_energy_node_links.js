import db from '../../db';

export default async function (req, res) {
	//Temp, this will be dynamically set from the users token.
  const companyId = "FED4FC15-ECC5-4957-A330-C1928448A2FE"

     let paramsNode = {
        TableName: "EnergyNodes",
        ExpressionAttributeValues: {
            ':n': companyId
        },
        KeyConditionExpression: '#name = :n',
        ExpressionAttributeNames: { 
            "#name": "companyId" , 
        }
    }

    let paramsLink = {
        TableName: "EnergyNodeLinks",
        ExpressionAttributeValues: {
            ':n': companyId
        },
        KeyConditionExpression: '#name = :n',
        ExpressionAttributeNames: { 
            "#name": "companyId" , 
        }
    }

    let promiseNode = new Promise((resolve , reject) => {
      db.query(paramsNode, async function (err, data) {
        if (err) {
          console.log('Error', err);
          reject()
        } else {
          resolve(data.Items);
        }
      });
    })

    let promiseLink = new Promise((resolve , reject) => {
      db.query(paramsLink, async function (err, data) {
        if (err) {
          console.log('Error', err);
          reject()
        } else {
          resolve(data.Items);
        }
      });
    })

    Promise.all([promiseNode, promiseLink]).then(values => {
      const [nodeList, linkList] = values

      const nodeNames = Object.fromEntries(nodeList.map((node) => ([node.id, node.name])));
      const nodeNameLinks = linkList.map((link) => ({from: nodeNames[link.from], to: nodeNames[link.to], value: link.value}))

      res.status(200).json(nodeNameLinks);
    });
}
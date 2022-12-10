import { link } from 'fs';
import db from '../../db';

export default async function (req, res) {
    const query = req.query;
    const { companyId } = query;

    if (req.method !== 'GET') {
        res.status(405).send({ message: 'Only GET requests allowed' })
        return
    }

    const body = req.body;

    if(companyId == null || companyId === ''){
        res.status(400).end("companyId must be provided")
    }

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
        let valueSums = {}
        let [nodeList, linkList] = values

        const nodesWithInput = linkList.map((l) => {
            return l.to
        })

        const nodesWithOutput = linkList.map((l) => {
            return l.from
        })

        for (let node of nodeList){
            for (let link of linkList){
                if(link.from == node.id && !(nodesWithOutput.includes(node.id) && (nodesWithInput.includes(node.id)))){
                    if (Object.keys(valueSums).includes(node.name) ) {
                        valueSums[node.name] = valueSums[node.name] + parseFloat(link.value)
                    } else {
                        valueSums[node.name] = parseFloat(link.value)
                    }
                }
            }
        }   

        res.status(200).json(valueSums);
    })

}
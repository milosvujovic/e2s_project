import db from "../../db";
import jwt from 'jsonwebtoken';

export default async function (req, res) {

    const bcrypt = require("bcrypt");

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    const body = req.body;

    if(body.email == null || body.password == null){
        res.status(400).end("email and password must be provided in the json body")
    }

    const params = {
        TableName: 'Users',
        Key: {
            emailAddress: body.email
        }
    };

    await db.get(params, async function (err, data) {
        if (err) {
            console.log('Error', err);
            res.status(500).end()
        } else {
            if (data.Item == null) {
                res.status(400).end("This account does not exist");
            }
            if (data.Item.password == null) {
                res.status(400).end("There is no password associated with this account")
            }
            await bcrypt.compare(body.password, data.Item.password).then(function(result){
                if (result) {
                    const KEY = process.env.JWT_KEY;
                    const token = jwt.sign(
                        data.Item,
                        KEY,
                        {
                            expiresIn: 604800, //a week
                        }
                    );

                    res.setHeader("set-cookie", [
                        `token=${token};path=/;`
                    ])
                    res.status(200).json(token)
                } else {
                    res.status(400).end("Incorrect password")
                }
            })
        }
    });
}
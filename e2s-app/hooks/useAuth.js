import jwt from 'jsonwebtoken';
import Router from 'next/router';

export function verifyToken(jwtToken) {
    // JWT secret key
    const SECRET_KEY = process.env.JWT_KEY;

    try {
        return jwt.verify(jwtToken, SECRET_KEY);
    } catch (e) {
        console.log('e:', e);
        return null;
    }
}

export async function getUser(req){
    const token = req.cookies["token"]

    if (token == undefined) {
        return null;
    }

    const tokenData = verifyToken(token)

    let response = await fetch(`${process.env.HOST}/api/permission_groups?company=${tokenData.company}`)

    let data = await response.json()

    console.log("looking up permissions")

    tokenData.permission_groups = data

    let flat_permissions = []
    for (let permission of tokenData.permissions.direct){
        flat_permissions.push(permission.name)
    }

    for (let group of tokenData.permissions.groups){
        let permission_groups_filtered = tokenData.permission_groups.filter(pgroup => pgroup.name == group)[0]
        for (let permission of permission_groups_filtered.permissions){
            flat_permissions.push(permission.name)
        }
    }

    console.log("setting flat permissions")

    tokenData.flat_permissions = flat_permissions

    console.log("permissions set")

    return tokenData


}
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

export function getUser(req){
    const token = req.cookies["token"]

    if (token == undefined) {
        return null;
    }

    const tokenData = verifyToken(token)

    return tokenData
}
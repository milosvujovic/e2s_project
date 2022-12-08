import {NextResponse} from "next/server";

export async function middleware(req) {
    const response = NextResponse.next();

    const protectedUrls = [
        "/dashboard",
        "/emissions",
        "/infrastructure",
        "/reporting",
        "/settings",
        "/usage",
        "/helloWorld"
    ]
    const cookie = req.cookies.get("token")
    //NOTE! Cannot do jwt verification in middleware so still need to check in getauth that user is valid
    let protected_url = false
    for (let url of protectedUrls) {
        if (req.url.includes(url)){
            protected_url = true
        }
    }
    if (protected_url) {
        if (cookie === undefined) {
            return NextResponse.redirect(`${process.env.HOST}/login`, 303);
        }
    }

    const url = req.nextUrl.clone()   
    if (url.pathname === '/') {
        url.pathname = '/dashboard'
        return NextResponse.redirect(url)   
    } 

    if (req.url.includes("/login") && !req.url.includes("/api")) {
        if (cookie !== undefined) {
            return NextResponse.redirect(`${process.env.HOST}/dashboard`, 303);
        }
    }

    return NextResponse.next();
}
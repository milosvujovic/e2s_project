export default async function logout(req, res) {
	res.setHeader("set-cookie", [
        `token=deleted;path=/;Max-Age=0;`
    ])

    res.redirect(307, '/login').end()
}
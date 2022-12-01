export default async function logout(req, res) {
	res.setHeader("set-cookie", [
        `token=deleted;path=/;Max-Age=0;`
    ])

    console.log('logged out')

    res.redirect(307, '/login').end()
}
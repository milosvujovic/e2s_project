export default async function (req, res) {
    const query = req.query;
    const { password } = query;
    const bcrypt = require("bcrypt");

    const hashed = await bcrypt.hash(password, 10).then(function(hash){
        return hash;
    });

    res.status(200).json(hashed);
}
const jwt = require("jsonwebtoken");
const config = require("config");

// login qilinganmi yoqmi shuni tekshirib beradi
module.exports = function auth(req, res, next) {
    // token bor-yoqligini tekshirish
    const token = req.header("x-auth-token");
    if (!token)
        return res
            .status(401)
            .send("Token mavjud bo`lmaganligi sababli murojat rad etildi!");

    // token bor bo`lsa uni to`g`riligini tekshiramiz
    try {
        const decoded = jwt.verify(token, "buM@xfiyKalit");
        req.user = decoded;
        next();
    } catch (ex) {
        return res.status(400).send("Yaroqsiz token");
    }
};

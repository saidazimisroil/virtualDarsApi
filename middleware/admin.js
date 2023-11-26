module.exports = function admin(req, res, next) {
    // user ning adminligini tekshirish
    if (!req.user.isAdmin) return res.status(403).send("Acces denied");

    // agar admin bo'lsa keyingi funkisyaga ruxsat beriladi
    next();
};

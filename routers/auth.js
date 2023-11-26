const express = require("express");
const Joi = require("joi");
const router = express();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { config } = require("config");
const config = require("config");
const users = require("../database/users"); // array

// Authorization and Authentification
// Registration id, name, email, password, isAdmin

// getting users
router.get("/", (req, res) => {
    res.send(users);
});

//  USER LOGIN | post
router.post("/", async (req, res) => {
    let { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const user = _.pick(req.body, ["email", "password"]);

    const foundUser = users.find((u) => u.email === user.email);

    if (!foundUser) {
        return res.status(400).send("Email  noto`g`ri!");
    }

    const isPasswordValid = await bcrypt.compare(
        user.password,
        foundUser.password
    );

    if (!isPasswordValid) {
        return res.status(400).send("Email yoki parol noto`g`ri!");
    }

    const token = jwt.sign(
        { name: foundUser.name },
        // config.get("jwtPrivateKey") // env var dan foydalana ololmaganimiz uchun
        "buM@xfiyKalit"
    );
    res.header("x-auth-token", token).send(true);
});

function validate(req) {
    let schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    });

    return schema.validate(req);
}

module.exports = router;

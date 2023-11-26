const express = require("express");
const Joi = require("joi");
const router = express();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

// Authorization and Authentification
// Registration id, name, email, password
const users = require("../database/users"); // array

// getting all users
router.get("/", (req, res) => {
    res.send(users);
});

// getting myself
router.get("/me", auth, (req, res) => {
    const user = users.find((u) => u.name === req.user.name);

    delete user.password;

    res.send(req.user);
});

// User Registration | post
router.post("/", async (req, res) => {
    let { error } = validateUser(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const userTemp = _.pick(req.body, ["name", "email", "password", "isAdmin"]);

    // new id generating
    let newUserId;
    if (users.length > 0) {
        newUserId = users[users.length - 1].id + 1;
    } else {
        newUserId = 1; // or any initial value you prefer for the first user
    }

    const user = { id: newUserId, ...userTemp };

    // password hashing
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt); // gen password of user

    users.push(user); // adding into an array

    const result = _.pick(user, ["id", "name", "email", "isAdmin"]);
    res.send(result);
});

function validateUser(user) {
    let schema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        isAdmin: Joi.bool().required(),
    });

    return schema.validate(user);
}

// function findCategory(id) {
//     return users.find((c) => c.id === parseInt(id));
// }

module.exports = router;

const express = require("express");
const Joi = require("joi");
const router = express();
const auth = require("../middleware/auth.js"); // token ni tekshirish uchun middleware
const admin = require("../middleware/admin.js"); // "Role"ni aniqlash uchun

// hardcode categories
// const categories = [
//     { id: 1, name: "dasturlash" },
//     { id: 2, name: "tarmoqlar" },
//     { id: 3, name: "data science" },
//     { id: 4, name: "database" },
// ];

// CRUD
// Get All
router.get("/", (req, res) => {
    res.send(categories);
});
// Get by ID
router.get("/:id", (req, res) => {
    const category = findCategory(req.params.id);

    if (!category) return res.status(404).send("Category is not found");

    res.send(category);
});

// Post
router.post("/", auth, (req, res) => {
    let { error } = validateCategory(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const category = {
        id: categories.length + 1,
        name: req.body.name,
    };
    categories.push(category);
    res.send(category);
});

// Put
router.put("/:id", auth, (req, res) => {
    const category = findCategory(req.params.id);
    if (!category) return res.status(404).send("Category is not found");

    let { error } = validateCategory(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    category.name = req.body.name;
    res.send(category);
});

// Delete
router.delete("/:id", [auth, admin], (req, res) => {
    const category = findCategory(req.params.id);
    if (!category) return res.status(404).send("Category is not found");

    let index = categories.indexOf(category);
    categories.splice(index, 1);
    res.send(category);
});

function validateCategory(category) {
    let schema = Joi.object({
        name: Joi.string().min(4).required(),
    });

    return schema.validate(category);
}

function findCategory(id) {
    return categories.find((c) => c.id === parseInt(id));
}

module.exports = router;

const express = require("express");
const errorMiddleware = require("../middleware/error");
const categories = require("../routers/categories");
const authRoute = require("../routers/auth");
const users = require("../routers/users"); // route

module.exports = function (app) {
    app.use(express.json()); // middlewere
    app.use("/api/categories", categories);
    app.use("/api/users", users);
    app.use("/api/auth", authRoute);
    app.use(errorMiddleware);
};

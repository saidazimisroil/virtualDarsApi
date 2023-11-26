const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db");
require("./startup/config")();
require("./startup/prod")(app);

// port listener
const port = process.env.port1 || 5000;
const server = app.listen(port, () => {
    console.log(`${port} - portni eshitish boshlandi...`);
});

module.exports = server;

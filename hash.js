const bcrypt = require("bcrypt");

async function getSalt() {
    const salt = await bcrypt.genSalt();
    const password = "12345";
    const pwhash = await bcrypt.hash(password, salt);
    console.log(salt);
    console.log(pwhash);
}

getSalt();

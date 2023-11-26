require("express-async-errors");
const winston = require("winston"); // xatoni logga yozish u-n
// require("winston-mongodb");

module.exports = function () {
    winston.add(
        new winston.transports.File({ filename: "virtualdars-logs.log" })
    );

    // ilinmay qolgan xatolar u-n
    // global exception handler:
    winston.exceptions.handle(
        new winston.transports.Console(),
        new winston.transports.File({ filename: "virtualdars-logs.log" })
    );

    // process.on("uncaughtException", (ex) => {
    //     winston.error(ex.message, ex);
    //     // process.exit(1); // negadir menda boshqacha ishlavotti
    // });

    // async xatolar u-n
    process.on("unhandledRejection", (ex) => {
        throw ex; // yuqoridagi handle() metodi buni ilib oladi
        // winston.error("unhandledRejection xatosi \n" + ex.message, ex);
        // process.exit(1);
    });

    // atayin yozilgan xatolar :
    // const myPromise = Promise.reject("yana kutilmagan xato").then("bitdi");

    // throw new Error("Kutilmagan xato"); // ilinmay qoladigan xato
};

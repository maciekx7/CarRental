const db = require("../models");
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
    console.log("TEST" + req.body.email);
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(user) {
            res.status(400).send({
                message: "Email is already in use!"
            });
            return;
        }
        next();
    });
}

const verifySingUp = {
    checkDuplicateEmail: checkDuplicateEmail
}

module.exports = verifySingUp;
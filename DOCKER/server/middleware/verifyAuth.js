const { sendStatus, isNullData, checkIsInteger } = require("../tools/tools");
const config = require("../config/auth.config");
const db = require("../models/index");
const User = db.user;


veryfiNotNullData = (req, res, next) => {
    var password = req.body.password;
    var name = req.body.name;
    var lastname = req.body.lastName;
    var phone = req.body.phone;
    try {
        if (isNullData(password)) {
            sendStatus(res, 400, "Password is required!")
        } else if (isNullData(name)) {
            sendStatus(res, 400, "Name is required!")
        } else if (isNullData(lastname)) {
            sendStatus(res, 400, "LastName is required!")
        } else if (isNullData(phone)) {
            sendStatus(res, 400, "Phone is required!")
        } else if (!checkIsInteger(phone)) {
            sendStatus(res, 400, "Phone must be integer!")
        }
        else {
            next();
        }




    } catch (err) {
        return res.status(500).send({
            message: err.message
        })
    }

}


verifyEmail = (req, res, next) => {
    try {
        var email = req.body.email;
        if (isNullData(email)) {
            sendStatus(res, 400, "EMAIL cannot be null");
        } else if (!email.includes("@")) {
            sendStatus(res, 400, "Wrong email format!");
        } else {
            next();
        }

    } catch (err) {
        sendStatus(res, 500, err.message);
    }
}

verifyCurrentPassword = async (req, res, next) => {
    try {
        var user = await User.findByPk(req.userId);
        if (isNullData(req.body.currentPassword)) {
            sendStatus(res, 400, "Current Password cannot be null!")
        } else if (!user.validPassword(req.body.currentPassword)) {
            sendStatus(res, 400, "Current Password not valid")
        } else {
            next();
        }
    } catch (err) {
        return sendStatus(res, 500, err.message);
    }
}


const verifyAuth = {
    veryfiNotNullData: veryfiNotNullData,
    verifyEmail: verifyEmail,
    verifyCurrentPassword: verifyCurrentPassword
}


module.exports = verifyAuth;
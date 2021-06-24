const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
var bycrypt = require("bcryptjs");



var jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
    // Save User to Database
    User.create({
        email: req.body.email,
        name: req.body.name,
        lastName: req.body.lastName,
        phone: req.body.phone,
        password: req.body.password,
        role: req.role
    })
        .then(() => {
            res.send({ message: "User was registered successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};




exports.singin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found"
                });
            }

            var password = req.body.password;

            if (!user.validPassword(password)) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 //24h
            });

            res.status(200).send({
                id: user.id,
                email: user.email,
                name: user.name,
                lastName: user.lastName,
                phone: user.phone,
                role: user.role,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        });
};


exports.updateData = async (req, res) => {
    User.update(
        {
            name: req.body.name,
            lastName: req.body.lastName,
            phone: req.body.phone,
            password: User.createNewHash(req.body.password)
        },
        {
            where: {
                id: req.userId
            }
        }
    )
        .then(user => {
            res.send({
                message: `User data updated`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


exports.getUserData = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'password']
        }
    })
        .then(user => {
            res.json({
                user
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};
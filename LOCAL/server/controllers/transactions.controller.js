const db = require("../models");
const Transaction = db.transaction;
const Car = db.car;

exports.createTransaction = (req, res, next) => {
    try {

        Car.findByPk(req.body.CarId)
            .then(car => {
                console.log()
                if (!car.isAvaliable()) {
                    res.status(400).send({
                        message: "Car is not avaliable"
                    });
                    return;
                }
                Transaction.create({
                    UserId: req.userId,
                    CarId: req.body.CarId,
                    rentDate: req.body.rentDate
                }
                ).then(() => {
                    Car.update({
                        availability: 0
                    },
                        {
                            where: {
                                id: req.body.CarId
                            }
                        });
                })
                    .then(() => {
                        res.send({
                            message: "Transaction created!"
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send({
                            message: err.message
                        })
                    });

            });



    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }

}

exports.closeTransaction = (req, res, next) => {
    Transaction.findByPk(req.params.id)
        .then((transaction) => {
            Transaction.update({
                returnDate: req.body.returnDate,
                cost: req.body.cost
            },
                {
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => {
                    Car.update({
                        availability: 1
                    },
                        {
                            where: {
                                id: transaction.CarId
                            }
                        })
                })
                .then(() => {
                    res.send({
                        message: "Transaction closed!"
                    })
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message
                    })
                });

        })
}

exports.getUserTransactions = (req, res, next) => {
    Transaction.findAll({
        where: {
            UserId: req.userId
        },
        include: [{
            model: db.user,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'role', 'phone', 'id', 'name', 'lastName'],
            }
        },
        {
            as: "User",
            model: Car,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            as: "Car",
            include: {
                model: db.carModel,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                as: "CarModel",
                include: {
                    model: db.make,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    as: "Make"
                }
            }
        }
        ],
        attributes: {
            exclude: [
                "createdAt",
                "updatedAt"
            ]
        }

    })
        .then((transaction) => {
            res.json({
                transaction
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}

exports.getAllTransactions = (req, res, next) => {
    Transaction.findAll({
        include: [{
            model: db.user,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'role', 'phone', 'id', 'name', 'lastName'],
            }
        },
        {
            as: "User",
            model: Car,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            as: "Car",
            include: {
                model: db.carModel,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                as: "CarModel",
                include: {
                    model: db.make,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    as: "Make"
                }
            }
        }
        ],
        attributes: {
            exclude: [
                "createdAt",
                "updatedAt"
            ]
        }
    })
        .then((transaction) => {
            res.json({
                transaction
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}



exports.getTransaction = (req, res, next) => {
    Transaction.findOne({
        where: {
            id: req.params.transactionID
        },
        include: [{
            model: db.user,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'role', 'phone', 'id', 'name', 'lastName'],
            }
        },
        {
            as: "User",
            model: Car,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            as: "Car",
            include: {
                model: db.carModel,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                as: "CarModel",
                include: {
                    model: db.make,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    as: "Make"
                }
            }
        }
        ],

        attributes: {
            exclude: [
                "createdAt",
                "updatedAt"
            ]
        }
    })
        .then((transaction) => {
            res.json({
                transaction
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}

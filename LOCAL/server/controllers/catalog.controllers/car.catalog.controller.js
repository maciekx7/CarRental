const db = require("../../models");
const Car = db.car;

exports.createCar = (req, res) => {
    Car.create({
        cost: req.body.cost,
        VIN: req.body.VIN,
        availability: req.body.availability,
        CarModelId: req.body.CarModelId
    })
        .then((car) => {
            res.json({
                car,
                message: "Car created successfuly!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};



exports.updateCar = (req, res) => {
    Car.update(
        {
            cost: req.body.cost,
            VIN: req.body.VIN,
            availability: req.body.availability,
            CarModelId: req.body.CarModelId
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(() => {
            res.send({
                message: "Car updated!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.deleteCar = (req, res) => {
    Car.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.send({
                message: "Car deleted!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.getCar = (req, res) => {
    Car.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: db.carModel, include: {
                model: db.make,
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
        .then(car => {
            res.json({
                car
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};



exports.getCars = (req, res) => {
    try {
        var param = req.query.availability;
        switch (param) {
            case "1":
                getStatusCars(req, res);
                break;
            case "0":
                getStatusCars(req, res);
                break;
            default:
                getAllCars(req, res);
                break;
        }
    }
    catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
};

function getAllCars(req, res) {
    Car.findAll({
        include: {
            model: db.carModel, include: {
                model: db.make,
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
        .then(car => {
            res.json({
                car
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

function getStatusCars(req, res) {
    Car.findAll({
        where: {
            availability: req.query.availability
        },
        include: {
            model: db.carModel, include: {
                model: db.make,
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
        .then(car => {
            res.json({
                car
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};









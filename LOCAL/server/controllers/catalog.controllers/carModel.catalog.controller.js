const db = require("../../models");
const carModels = require("../../models/car.models");

const CarModel = db.carModel;
const Make = db.make;

exports.createModel = (req, res) => {
    CarModel.create({
        name: req.body.name,
        fuel: req.body.fuel,
        body: req.body.body,
        productionYear: req.body.productionYear,
        enginePower: req.body.enginePower,
        MakeId: req.body.MakeId
    })
        .then(() => {
            res.send({
                message: "Car model created successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};




exports.updateModel = (req, res) => {
    CarModel.update(
        {
            name: req.body.name,
            fuel: req.body.fuel,
            body: req.body.body,
            productionYear: req.body.productionYear,
            enginePower: req.body.enginePower,
            MakeId: req.body.MakeId
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(() => {
            res.send({
                message: "Car model updated!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.deleteModel = (req, res) => {
    CarModel.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.send({
                message: "Car model deleted!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.getAllModels = (req, res) => {
    CarModel.findAll({
        include: {
            model: Make,
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            as: "Make"
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
        .then(model => {
            res.json({
                model
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.getModel = (req, res) => {
    CarModel.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Make,
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            as: "Make"
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
        .then(model => {
            res.json({
                model
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};
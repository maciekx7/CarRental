const db = require("../../models");
const Car = db.car;
const Transaction = db.transaction;
const { sendStatus } = require("../../tools/tools");


checkCarDuplicate = (req, res, next) => {
    Car.findOne({
        where: {
            VIN: req.body.VIN
        }
    })
        .then(car => {
            if (car) {
                var message = 'Car with that VIN  already exists';
                sendStatus(res, 400, message);
            } else {
                next();
            }
        })
        .catch(err => {
            var message = err.message;
            sendStatus(res, 500, message);

        });
};

checkCarExisting = (req, res, next) => {
    Car.findByPk(req.params.id)
        .then(car => {
            if (!car) {
                var message = "Car not found!";
                sendStatus(res, 404, message);
            } else {
                next();
            }
        })
        .catch(err => {
            var message = err.message;
            sendStatus(res, 500, message);
        });
};

checkCarUsage = async (req, res, next) => {
    try {
        if (req.params.id > 0) {
            var count = await Car.count({
                include: {
                    model: Transaction,
                    where: {
                        CarId: req.params.id
                    }
                }
            })

            if (count > 0) {
                var message = "Removal NOT ALLOWED! Car is in use!";
                sendStatus(res, 409, message);
            } else {
                return next();
            }
        } else {
            var message = "CarID is incorrect";
            sendStatus(res, 404, message);    
        }

    } catch (err) {
        var message = err.message;
        sendStatus(res, 500, message);
    }
}

const verifyCar = {
    checkCarDuplicate: checkCarDuplicate,
    checkCarExisting: checkCarExisting,
    checkCarUsage: checkCarUsage
}

module.exports = verifyCar;


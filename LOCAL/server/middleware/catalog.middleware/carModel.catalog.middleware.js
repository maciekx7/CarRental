const db = require("../../models");
const CarModel = db.carModel;
const Car = db.car;
const { fuelType, bodyType } = require("../../config/models.config/carModel.config/index");
const { sendStatus, isNullData, checkIsInteger } = require("../../tools/tools");




checkCarModelDuplicate = (req, res, next) => {
    CarModel.findOne({
        where:{
            name: req.body.name,
            fuel: req.body.fuel,
            body: req.body.body,
            productionYear: req.body.productionYear,
            enginePower: req.body.enginePower,
            MakeId: req.body.MakeId
        }
    }) 
    .then(model => {
        if(model) {
            sendStatus(res, 400, "Car model already exists!");
        } else {
            next();
        }
    })
    .catch(err => {
        sendStatus(res, 500, err.message)
    });
};

chechCarModelExisting = (req, res, next) => {
    CarModel.findByPk(req.params.id)
        .then(model => {
            if(!model) {
                sendStatus(res, 404, "Car model not found!" );
            } else {
                next();
            }
        })
        .catch(err => {
            sendStatus(res, 500, err.message)
        });
};

checkModelUsage = async (req, res, next) => {
    try {
        if(req.params.id > 0 ) {
            var count = await CarModel.count({
                include: {
                    model: Car,
                    where: {
                        CarModelId: req.params.id
                    }
                }
            })
    
            if(count > 0 ) {
                var message = "Removal NOT ALLOWED! Model is in use!";
                return sendStatus(res, 409, message);
            } else {
                return next();
            }
        } else {
            return sendStatus(res, 404, "ModelID is incorrect");
        }


    } catch( err ) {
        sendStatus(res, 500, err.message);
    }
}

chechModelNotNull = (req, res, next) => {
    try {
        var undef;
        var name = req.body.name;
        var fuel = req.body.fuel;
        var body = req.body.body;
        var productionYear = req.body.productionYear;
        var enginePower = req.body.enginePower;
        var MakeId = req.body.MakeId;

        var allFuels = [];
        for(var key in fuelType) {
            allFuels.push(fuelType[key]);
        }

        var allBody = [];
        for(var key in bodyType) {
            allBody.push(bodyType[key]);
        }

        if(isNullData(name)) {
            var message = "Name cannot be null"
            sendStatus(res,400, message);
        } else if(!allFuels.includes(fuel)) {
            var message = "Fuel can be only " + allFuels.join([separator = ', ']);
            sendStatus(res, 400, message);
        } else if(!allBody.includes(body)) {
            var message = "Body can be only: " + allBody.join([separator = ", "]);
            sendStatus(res,400, message);
        } else if(isNullData(productionYear)) {
            var message = "Production Year cannot be null!"
            sendStatus(res, 400,message);
        } else if(!checkIsInteger(productionYear)) {
            var message = "Production Year must be a number!";
            sendStatus(res, 400, message);
        } else if(isNullData(enginePower)) {
            var message = "Engine Power cannot be null";
            sendStatus(res, 400,  message);
        } else if(!checkIsInteger(enginePower)) {
            var message = "Engine Power must be a number!";
            sendStatus(res, 400, message);
        } else if(isNullData(MakeId)) {
            var message = "MakeId cannot be null!";
            sendStatus(res, 400, message);
        } else {
            next();
        }


    } catch( err ) {
        sendStatus(res, 500, err.message);
    }
}


const verifyCarModel = {
    checkCarModelDuplicate: checkCarModelDuplicate,
    chechCarModelExisting: chechCarModelExisting,
    checkModelUsage: checkModelUsage,
    chechModelNotNull: chechModelNotNull
}

module.exports = verifyCarModel;
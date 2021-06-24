const db = require("../../models");
const Make = db.make;
const CarModel = db.carModel;
const { sendStatus, isNullData, checkIsInteger } = require("../../tools/tools");


chechMakeDuplicate = (req, res, next) => {
    Make.findOne({
        where: {
            name: req.body.name
        }
    }).then(make => {
        if(make) {
            sendStatus(res, 400, "Make already exists");
        } else {
            next();
        }
    })
    .catch(err => {
        sendStatus(res, 500, err.message);
    });
};

checkMakeExisting = (req, res, next) => {
    Make.findByPk(req.params.id)
        .then(make => {
            if(!make) {
                sendStatus(res, 404,  "Make not found!");
            } else {
                next();
            }
        })
        .catch(err => {
            sendStatus(res,500, err.message);
        });
};

checkMakeUsage = async (req, res, next) => {
    try {
        if(req.params.id > 0 ) {
            var count = await Make.count({
                include: {
                    model: CarModel,
                    where: {
                        MakeId: req.params.id
                    }
                }
            })
    
            if(count > 0) {
                sendStatus(res, 409, "Removal NOT ALLOWED! Make is in use!");
            } else {
                return next();
            }
            
        } else {
            sendStatus(res, 404, "MakeID is incorrect");
        }


    } catch( err ) {
        sendStatus(res, 500, err.message);
    }
}

checkMakeNotNull = async (req, res, next) => {
    try {
        var make = req.body.name;
        if(isNullData(make)) {
            sendStatus(res, 400, "Make cannot be null!");
        } else {
            next();
        }
    } catch (err) {
        sendStatus(res, 500, err.message);
    }
}

const verifyMake = {
    chechMakeDuplicate: chechMakeDuplicate,
    checkMakeExisting: checkMakeExisting,
    checkMakeUsage: checkMakeUsage,
    checkMakeNotNull: checkMakeNotNull
}



module.exports = verifyMake;

const { fuelType, bodyType } = require("../config/models.config/carModel.config");

module.exports = (sequelize, Sequelize) => {
    const CarModel = sequelize.define("CarModel", {
        name: 
        {
            type: Sequelize.STRING,
            allowNull: false
        },
        fuel: {
            type: Sequelize.STRING(3),
            allowNull: false,
            default: fuelType.GAZ,
            enum: [fuelType.GAZ, fuelType.ON, fuelType.PB ] 
        },
        body: {
            type: Sequelize.STRING(10),
            allowNull: false,
            default: bodyType.SUV,
            enum: [ bodyType.SUV, bodyType.LIMUZYNE, bodyType.WAGON ]
        },
        productionYear: {
            type: Sequelize.INTEGER,
            allownull: false
        },
        enginePower: {
            type: Sequelize.INTEGER,
            allowNull: false
        }

    },
    {
        tableName: "CarModels"
    });
    
    return CarModel;
}
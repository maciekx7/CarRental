
module.exports = (sequelize,Sequelize) => {
    const Car = sequelize.define("Car", {
        cost: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        VIN: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        availability: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            default: 1
        }
    }, {
        tableName: "Cars"
    });

    Car.prototype.changeAvaliabilityStatus = function() {
        if(this.availability == 1) { this.availability = 0; }
        if(this.availability == 0) { this.availability = 1; }
    }

    Car.prototype.isAvaliable = function() {
        if(this.availability == 0) { return false; }
        return true;
    }

    return Car;
}
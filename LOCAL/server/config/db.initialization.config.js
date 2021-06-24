
var roles = require("./models.config/user.roles.config");
const db = require("../models");
const { fuelType, bodyType } = require("./models.config/carModel.config");

const User = db.user;
const Make = db.make;
const CarModel = db.carModel;
const Car = db.car;
const Transaction = db.transaction;

async function initialDB() {
  await User.create({
    name: "Admin",
    lastName: "Admin",
    phone: "123456789",
    email: "admin",
    password: "admin",
    role: roles.ADMIN
  });

  await User.create({
    name: "Example",
    lastName: "User",
    phone: "444444444",
    email: "example@user.com",
    password: "123",
    role: roles.USER
  });

  await Make.create({
    name: "BMW"
  })
  await CarModel.create({
    name: "X5",
    fuel: fuelType.ON,
    body: bodyType.SUV,
    productionYear: 2020,
    enginePower: 200,
    MakeId: 1
  })
  await Car.create({
    cost: 250,
    VIN: 2334433,
    availability: 1,
    CarModelId: 1
  })
  await Transaction.create({
    cost: 1250,
    rentDate: "2021-05-15",
    returnDate: "2021-05-18",
    CarId: 1,
    UserId: 1
  });

  await Make.create({
    name: "AUDI"
  })
  await CarModel.create({
    name: "Q7",
    fuel: fuelType.ON,
    body: bodyType.SUV,
    productionYear: 2019,
    enginePower: 220,
    MakeId: 2
  })
  await Car.create({
    cost: 275,
    VIN: 111111,
    availability: 1,
    CarModelId: 2
  })
  await Transaction.create({
    cost: 2000,
    rentDate: "2021-05-20",
    returnDate: "2021-05-25",
    CarId: 2,
    UserId: 2
  });

  await Make.create({
    name: "PORSCHE"
  })
  await CarModel.create({
    name: "Cayenne GTS Coupe",
    fuel: fuelType.PB,
    body: bodyType.SUV,
    productionYear: 2021,
    enginePower: 650,
    MakeId: 3
  })
  await Car.create({
    cost: 999,
    VIN: 666,
    availability: 1,
    CarModelId: 3
  })

}

module.exports = { initialDB };
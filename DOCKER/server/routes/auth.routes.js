const { verifySingUp, authJwt, verifyAuth } = require("../middleware");
const controller = require("../controllers/auth.controller");
const roleType = require("../config/models.config/user.roles.config");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      
      app.post( 
        "/api/auth/signup",
        verifySingUp.checkDuplicateEmail,
        (req,res, next) => {
          req.role = roleType.USER;
          next();
        },
        controller.signup
      );

      app.post(
        "/api/auth/signup/admin",
        verifySingUp.checkDuplicateEmail,
        authJwt.verifyToken,
        authJwt.verifyAdmin,
        verifyAuth.veryfiNotNullData,
        verifyAuth.verifyEmail,
        (req,res, next) => {
          req.role = roleType.ADMIN;
          next();
        },
        controller.signup
      );


    app.post(
        "/api/auth/signin", 
        controller.singin
    );

    app.put(
        "/api/auth/update",
        authJwt.verifyToken,
        verifyAuth.veryfiNotNullData,
        verifyAuth.verifyCurrentPassword,
        controller.updateData
    );

    app.get(
      "/api/auth/data",
      authJwt.verifyToken,
      controller.getUserData
    );
}
const { authJwt, verifyMake } = require("../../middleware");
const controller = require("../../controllers/catalog.controllers/make.catalog.controller");

var express = require('express');
var router = express.Router();


router.route("/")
    .post(
        verifyMake.chechMakeDuplicate,
        authJwt.verifyToken,
        authJwt.verifyAdmin,
        verifyMake.checkMakeNotNull,
        controller.createMake
    )
    .get(
        controller.getAllMake
    );

router.route("/:id")
    .put(
        verifyMake.checkMakeExisting,
        authJwt.verifyToken,
        authJwt.verifyAdmin,
        controller.updateMake
    )
    .delete(
        verifyMake.checkMakeExisting,
        authJwt.verifyToken,
        authJwt.verifyAdmin,
        verifyMake.checkMakeUsage,
        controller.deleteMake
    )
    .get(
        verifyMake.checkMakeExisting,
        controller.getMake
    );
    
    router.route("/test/:id")
    .get(
        verifyMake.checkMakeUsage
    )

module.exports = router;
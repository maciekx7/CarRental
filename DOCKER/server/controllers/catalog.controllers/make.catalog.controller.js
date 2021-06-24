const db = require("../../models");
const Make = db.make;


exports.createMake = (req, res) => {
    Make.create({
        name: req.body.name
    })
        .then(make => {
            res.json({
                message: "Make created successfuly!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};



exports.updateMake = (req, res) => {
    Make.update(
        { name: req.body.name },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(() => {
            res.send({
                message: "Make updated!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        });
};

exports.deleteMake = async (req, res) => {
    try {
        await Make.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.send({
            message: "Make deleted!"
        });

    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
};

exports.getMake = (req, res) => {
    Make.findByPk(req.params.id, {
        attributes: {
            exclude: [
                "createdAt",
                "updatedAt"
            ]
        }
    })
        .then(make => {
            res.json({
                make
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        });
};


exports.getAllMake = (req, res) => {
    Make.findAll({
        attributes: {
            exclude: [
                "createdAt",
                "updatedAt"
            ]
        }
    })
        .then(make => {
            res.send({
                make
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

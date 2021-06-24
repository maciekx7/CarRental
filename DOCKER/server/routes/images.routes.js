const fs = require('fs');
const path = require('path');

const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, req.body.filename + ".jpg");
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .jpg format is allowed!'));
    }
  }
}).single("file");

module.exports = function (app) {
  app.post("/upload/jpg", function (req, res) {
    upload(req, res, function (err) {
      try {
        fs.renameSync(req.file.path, req.file.path.replace('undefined', req.body.filename));
      } catch(err) {
        return res.status(500).send({
          message: "Please, send the file!"
        })
      }
      if (err instanceof multer.MulterError) {
        console.log(err);
        return res.status(500).json(err)
      } else if (err) {
        console.log(err);
        return res.status(500).json(err)
      }
      else {
        res.json({ message: "Successfuly uploaded file!" });
      }
    })
  });

}

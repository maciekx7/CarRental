var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var cors = require('cors');
require('dotenv').config(); 


//ROUTES
var indexRouter = require('./routes/index');
var makeRouter = require("./routes/catalog.routes/make.catalog.routes");
var modelRouter = require("./routes/catalog.routes/carModel.catalog.routes");
var carRouter = require("./routes/catalog.routes/car.catalog.routes");
var transactionRouter = require("./routes/transactions.routes");

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
  secret: process.env.SESSION_SECRATE,
  cookie: []
}))

//DATABASE including
const db = require("./models");
const dbInitialisation = require("./config/db.initialization.config");

const User = db.user;
db.sequelize.sync({force: true}).then( () => {
  dbInitialisation.initialDB();
  console.log('Drop and resync db');
})
//db.sequelize.sync();



app.use('/', indexRouter);
app.use('/api/catalog/makes', makeRouter);
app.use('/api/catalog/models', modelRouter);
app.use('/api/catalog/cars', carRouter);
app.use("/api/transactions", transactionRouter);
require('./routes/images.routes')(app);
require('./routes/auth.routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

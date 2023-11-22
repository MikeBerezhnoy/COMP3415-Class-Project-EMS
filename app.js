//TO START - Either run NPM start or start nodemon service
//localhost:3000

// MAIN TO DO LIST:
// 1   Finish employee/manager section (Edit, delete for employees)
// 2   Finish shift section (Create, view, Edit, delete for shifts)
// 2.5 Need to be able to pull dropdown list of employees for shift creation
// 3   Finish the login section and functionality
// 4   Remove register section (employees will never self register - they will only be
//     added by managers)
// 5   employee punch clock system
// 6   manager dashboard
// 7   employee dashboard
// 8   manager reports


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// require mongoose
const mongoose = require('mongoose')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var managersRouter = require('./routes/managers');

var app = express();

//setup DB connection
mongoose.connect('mongodb+srv://hrosebor:cAk0yqChpTD5ZOp1@cluster0.njk7204.mongodb.net/EMS',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//connect to DB, console log status
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/managers', managersRouter);

app.post('/', function(req, res, next){
  // req.body object has your form values
  console.log(req.body.username);
  console.log(req.body.password);
});

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

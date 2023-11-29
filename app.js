//TO START - Either run NPM start or start nodemon service
//localhost:3000

// MAIN TO DO LIST:
// 1   Finish employee/manager section (Edit, delete for employees)
// 2   Finish shift section (Create, view, Edit, delete for shifts) -- CRUD is complete
// 2.5 Need to be able to pull dropdown list of employees for shift creation -- Done
// 2.6 Date needs to only display the date not the time -- Done
// 2.7 start and end time only need to display time -- Done
// 2.8 edit date, start and end time fields don't populate when taken to edit screen
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
//configs file
const configs = require("./config/global");
//below are are for user authentication and sessions
const passport = require("passport");
const session = require("express-session");
//import user model to configure local strategy
const User = require("./models/User");
// require mongoose
const mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var managersRouter = require('./routes/managers');
var shiftRouter = require('./routes/shift');

var app = express();

mongoose
  .connect(configs.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((message) => {
    //mongoose connected
    console.log("Connected successfully");
  })
  .catch((error) => {
    //error
    console.log("Error while connecting: " + error);
  });
  

// //setup DB connection
// mongoose.connect('mongodb+srv://hrosebor:cAk0yqChpTD5ZOp1@cluster0.njk7204.mongodb.net/EMS',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }
// );

// //connect to DB, console log status
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//configure session
app.use(
  session({
    secret: configs.sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

//configure passport
app.use(passport.initialize());
app.use(passport.session()); 
passport.use(User.createStrategy());

// //configure user object serialization/deserialization
passport.serializeUser(User.serializeUser()); // serializeUser method comes from plm package
passport.deserializeUser(User.deserializeUser());



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/managers', managersRouter);
app.use('/shift',shiftRouter);


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

// app.listen(3000, function () {
//   console.log('App found @ http://localhost:3000');
// });

module.exports = app;
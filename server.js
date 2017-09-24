var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var routes = require('./routes/omdbroute');
var bodyParser = require('body-parser');
var routes1 = require('./routes/myroute');
var routes2 = require('./routes/bookingDetailsRoute');
var routes3=require('./routes/SignupRoute');
var movieMapRoute=require('./routes/movieMappingroute');
var auth =  require('./routes/auth');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var auth =  require('./routes/auth');




var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
// user schema/model
var User = require('./models/user.js');

/* data base connection*/
mongoose.connect('mongodb://localhost:27017/bookmyshow');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected to DB');
});

//passport validation and authentication
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// route path
app.use('/api', routes); //using routes
app.use('/theater', routes1);
app.use('/mt_map', movieMapRoute);
app.use('/pay', routes2);
//app.use('/signup', routes3);
app.use('/user/', auth);

if (app.get('env') === 'development') {
  var webpackMiddleware = require("webpack-dev-middleware");
  var webpack = require('webpack');
  var config = require('./webpack.config');
  app.use(webpackMiddleware(webpack(config), {
    publicPath: "/build",
    headers: { "X-Custom-Webpack-Header": "yes" },
    stats: {
      colors: true
    }
  }));
}

app.listen(5000,function(){
  console.log('Server is running on port 5000');
});

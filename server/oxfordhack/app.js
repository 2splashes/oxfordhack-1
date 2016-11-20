var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');

var Users = require('./models/users');

var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

var index = require('./routes/index');
var load = require('./routes/load');
var image = require('./routes/image');
var login = require('./routes/auth/login');
var logout = require('./routes/auth/logout');

var app = express();

// We need to remove the actual keys from the source at some point
passport.use(new Strategy({
        clientID: '365354147137718',
        clientSecret: '115a9b29823e452fa20dd7060f7cab80',
        callbackURL: 'http://ec2-54-191-173-129.us-west-2.compute.amazonaws.com/login/facebook/return',
        profileFields: ['id', 'name']
    },
    function (accessToken, refreshToken, profile, cb) {
        Users.addUser(profile.id);
        return cb(null, profile);
    }));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', handlebars({
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/login', login);
app.use('/logout', logout);
app.use('/', index);
app.use('/load', load);
app.use('/image', image);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error.handlebars');
});

module.exports = app;

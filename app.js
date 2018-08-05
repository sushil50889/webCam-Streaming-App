// var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var flash = require("connect-flash");
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');
const config = require('./config/config');
const User = require('./model/userModel');
// var debug = require('debug')('webcam-streaming-app:server');
// var socketIO = require('socket.io');
// var http = require('http');
// var serverWebSocket = require('./public/javascripts/serverWebSocket');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// var server = http.createServer(app);
// var io = socketIO(server);

mongoose.connect(config.db, { useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//using cors
app.use(cors());
//using flash
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'views')));

app.use([
  express.static(path.join(__dirname + '/node_modules/jquery/dist/')),
  express.static(path.join(__dirname + '/node_modules/bootstrap/dist/')),
  express.static(path.join(__dirname + '/node_modules/popper.js/dist/')),
  express.static(path.join(__dirname + '/node_modules/font-awesome/')),
  // express.static(__dirname + '/node_modules/materialize-css/dist/'),
]);


app.use(session({ 
  secret: 'keyboardcat',
  resave: true,
  saveUninitialized: true 
}));

// app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(emp, done) {
  done(null, emp.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, emp) {
    done(err, emp);
  });
});

require('./config/passport');

// serverWebSocket();

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(req, res, next){
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.currentUser = req.user;
  next();
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



/**
 * Get port from environment and store in Express.
 */

// var port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);

// /**
//  * Create HTTP server.
//  */


// // module.exports = io;

// io.on('connection', (socket) => {
//   console.log('new user coonected.');
// })

// /**
//  * Listen on provided port, on all network interfaces.
//  */

// server.listen(port);
// // server.on('error', onError);
// // server.on('listening', onListening);

// /**
//  * Normalize a port into a number, string, or false.
//  */

// function normalizePort(val) {
//   var port = parseInt(val, 10);

//   if (isNaN(port)) {
//     // named pipe
//     return val;
//   }

//   if (port >= 0) {
//     // port number
//     return port;
//   }

//   return false;
// }

/**
 * Event listener for HTTP server "error" event.
 */

// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }

//   var bind = typeof port === 'string'
//     ? 'Pipe ' + port
//     : 'Port ' + port;

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

/**
 * Event listener for HTTP server "listening" event.
 */

// function onListening() {
//   var addr = server.address();
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   debug('Listening on ' + bind);
// }

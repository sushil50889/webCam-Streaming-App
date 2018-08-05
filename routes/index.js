var express = require('express');
const passport = require('passport');
var router = express.Router();

const User = require('../model/userModel');
const ctrl = require('../controller/controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login&signup');
});



router.get('/host', ctrl.ensureAuthenticated, function(req, res, next) {
  res.render('index', {error: req.flash("error"), success: req.flash("success")});
});



router.get('/home', ctrl.ensureAuthenticated, function(req, res, next) {
  res.render('home', {error: req.flash("error"), success: req.flash("success")});
});



router.get('/streaming', ctrl.ensureAuthenticated, function(req, res, next) {
  res.render('streaming', {error: req.flash("error"), success: req.flash("success")});
});



router.get('/login&signup', function(req, res, next) {
  res.render('login', {error: req.flash("error"), success: req.flash("success")});
});



router.post('/login', passport.authenticate('local', {session: true, failureRedirect: '/login&signup'}), function(req, res, next) {
  req.flash("success", 'Successfully Logged-In.');
  res.redirect('/home');
});



router.post('/register', async function(req, res, next) {
  // console.log(newUserData);
  req.check('userName', 'User Name is Not Valid.').notEmpty().isString().isLength({min: 4});
  req.check('userEmail', 'Email Not Valid.').notEmpty().isEmail();
  req.check('userPassword', 'Password Not Valid.').notEmpty().isString().isLength({min: 4});

  var errors = req.validationErrors(); 
  if(errors){
    console.log(errors);
    errors.forEach((err)=>{
      req.flash("error", err.msg+'  ');
    });    
    res.redirect('/');
  }else {
    let user = await req.body;
    user.userPassword = await ctrl.hashPassword(user.userPassword);
    let newUser = new User(user);
    ctrl.add(newUser, 'You Are Successfully Registred.', req, res);
  }  
});



module.exports = router;

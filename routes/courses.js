var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
let Course = require('../models/course');

/* GET users listing. */
router.get('/', ensureLoggedIn, function(req, res, next) {
    Course.find({}, function(err, courses){
      if (err) {
        console.log(err);
      } else {
        res.render('courses', {
          user: req.user,
          courses: courses
        });
      }
    });
 });

module.exports = router;
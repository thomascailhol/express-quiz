var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
let Course = require('../models/course');

/* GET courses listing. */
router.get('/', function(req, res, next) {
    Course.find({}, function(err, courses){
      if (err) {
        console.log(err);
      } else {
        res.render('courses/index', {
          user: req.user,
          courses: courses
        });
      }
    });
 });


router.get('/new', ensureLoggedIn, function(req, res, next) {
  res.render('courses/new', {
    user: req.user
  });
});

router.get('/:id', ensureLoggedIn, function(req, res, next) {
  console.log(req.params.id);
  Course.findById(req.params.id, function(err, course){
    if (course) {
      res.render('courses/show', {
        user: req.user,
        course: course
      });
    } else {
      res.redirect('/courses');
    }
  });
});

router.post('/create', function(req, res, next) {
  let course = new Course();
  course.name = req.body.name;
  course.description = req.body.description;
  course.save(function(err){
    if(err){
      console.log(err);
      return;
    } else {
      res.redirect('/courses')
    };
  });
});

module.exports = router;
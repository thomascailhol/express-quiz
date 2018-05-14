var Course = require('../models/course');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const createError = require('http-errors');

// Display list of all Course.
exports.course_list = function(req, res, next) {
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
};

// Display detail page for a specific Course.
exports.course_detail = function(req, res, next) {
  Course.findById(req.params.id, function(err, course){
    if (course) {
      res.render('courses/show', {
        user: req.user,
        course: course,
        chapters: course.chapters
      });
    } else {
      // next(createError.NotFound());
    }
  });
};

// Display Course create form on GET.
exports.course_create_get = function(req, res, next) {
  console.log("hello");
  res.render('courses/new', {
    user: req.user
  });
};

// Create a new course.
exports.course_create_post = function(req, res, next) {
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
};

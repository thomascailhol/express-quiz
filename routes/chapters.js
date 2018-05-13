var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
let Course = require('../models/course');

router.get('/:id', function(req, res, next){
  console.log("Course id =" + req.query.course_id);
  console.log("Chapter id =" + req.params.id);
  let course = Course.findById(req.query.course_id, function (err, course) {
    if (err) {
      console.log(err)
    } else {
      let chapter = course.chapters.id(req.params.id);
      if (chapter) {
        console.log(chapter);
        res.render('chapters/show', {
          user: req.user,
          course: course,
          chapter: chapter,
          questions: []
        });
      } else {
        res.redirect('/courses');
      }
    }
  });
});

module.exports = router;
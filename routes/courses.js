var express = require('express');
var router = express.Router();

const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var Course = require('../models/course');

// require controllers
var course_controller = require('../controllers/courseController')

/* GET all courses. */
router.get('/', course_controller.course_list);

/* GET new course form. */
router.get('/new', course_controller.course_create_get);

/* POST new course. */
router.post('/create', course_controller.course_create_post);

/* GET course details. */
router.get('/:id', course_controller.course_detail);

module.exports = router;
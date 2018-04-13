const express = require('express');

const classController = require('../controllers/class_controller');
const teacherController = require('../controllers/teacher_controller');
const lessonController = require('../controllers/lesson_controller');
const classTeacherController = require('../controllers/class_teacher_controller');
const statisticsController = require('../controllers/statistics_controller');

const router = new express.Router();

// health_check
router.get('/health_check', (req, res) => {
    res.send({"message": "Welcome to Yimotion"});
});

router.get('/dashboard', (req, res) => {
    res.status(200).json({
        message: "You're authorized."
    });
});

// TODO refactor the routes into separate modules

router.post('/classes', classController.getAllClasses);

router.get('/classes/:class_id', classController.getOneClass);

router.post('/classes/new', classController.createNewClass);


router.post('/lessons/new', lessonController.createNewLesson);

router.post('/lessons', lessonController.getAllLessons);

router.get('/lessons/:lesson_id', lessonController.getOneLesson);

router.get('/lessons/:lesson_id/statistics', statisticsController.getAllStatistics);


router.post('/teachers/new', teacherController.createNewTeacher);

router.post('/teachers', teacherController.getAllTeachers);

router.get('/teachers/:teacher_id', teacherController.getOneTeacher);


router.post('/classes/teachers', classTeacherController.createNewClassTeacherAssociation);


module.exports = router;

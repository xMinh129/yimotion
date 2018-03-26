/* ******** ******** ******** ******** ******** ********  */
/* ******** ******** REST API ROUTING ******** ********  */
/* ******** ******** ******** ******** ******** ********  */
var express = require('express');
var router = express.Router();
var classController = require("../controllers/class_controller.js");

// Get all classes
router.get('/classes', classController.getAllClasses);

// Get one class by id
router.get('/classes/:class_id', classController.showOneClass);

module.exports = router;

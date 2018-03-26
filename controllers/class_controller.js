const Class = require("../models/class");

const classController = {};

/****************************  REST API CONTROLLERs  ******************************/
/*********************************************************************************/
/*********************************************************************************/

// Get all classes

classController.getAllClasses = function(req, res) {
  Class.find({}).exec(function (err, data) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.send(data);
    }
  });
};

// Get one patient

classController.showOneClass = function(req, res) {
  Class.findOne({_id: req.params.class_id}).exec(function (err, data) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.send(data);
         }
  });
};

module.exports = classController;

const Class = require('../models/class');
const classTeacherController = {};

classTeacherController.createNewClassTeacherAssociation = function (req, res) {
    Class.findById(parseInt(req.body.classId))
        .then(clss => {
            clss.addTeacher([parseInt(req.body.teacherId)]).then(association => {
                res.send(association);
            });
        });
};

module.exports = classTeacherController;



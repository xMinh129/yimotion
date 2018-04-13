const Statistic = require('../models/statistic');
const statisticsController = {};


statisticsController.getAllStatistics = function (req, res) {
    Statistic.findOne({lessonId: req.params.lesson_id}).exec().then(data => {
     console.log(data);
      res.send(data);
    }).catch(err => {
        res.status(500).send(err);
    })
};

module.exports = statisticsController;


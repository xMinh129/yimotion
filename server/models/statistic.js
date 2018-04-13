const mongoose = require('./mongo_config');

const StatisticSchema = new mongoose.Schema({
        lessonId: {type: String},
        statistics: []
    }, {
        collection: 'Statistics'
    }
);

module.exports = mongoose.model('Statistic', StatisticSchema);

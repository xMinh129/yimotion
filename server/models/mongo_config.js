const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const DBCONFIG_DEV = require('../load_db_config');

mongoose.connect(DBCONFIG_DEV.mongoDb.mongoClient)
  .then(() =>  console.log('Connected to Yimotion Mongo DB'))
  .catch((err) => console.error(err));

module.exports = mongoose;
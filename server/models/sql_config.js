const DBCONFIG_DEV = require('../load_db_config');

const Sequelize = require('sequelize');
const userName = DBCONFIG_DEV.sqlDb.userName;
const password = DBCONFIG_DEV.sqlDb.password;
const hostName = DBCONFIG_DEV.sqlDb.hostName;
const yimotionDbName = DBCONFIG_DEV.sqlDb.dbName;

module.exports = new Sequelize(yimotionDbName, userName, password, {
    dialect: 'mssql',
    host: hostName,
    port: 1433, // Default port
    logging: true, // disable logging; default: console.log

    dialectOptions: {
        requestTimeout: 30000,
        encrypt: true// timeout = 30 seconds
    }

});




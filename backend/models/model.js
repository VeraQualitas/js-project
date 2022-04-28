const config = require('../../backend_config.json');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.database.DB, config.database.USER, config.database.PASSWORD, {
  host: config.database.HOST,
  dialect: config.database.dialect,
  operatorsAliases: false,
  pool: {
    max: config.database.pool.max,
    min: config.database.pool.min,
    acquire: config.database.pool.acquire,
    idle: config.database.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/////////////////////////////////////////////////////
// models
db.accounts = require('./accounts.model.js')(sequelize, Sequelize);
db.sessions = require('./sessions.model.js')(sequelize, Sequelize);
db.stations = require('./stations.model.js')(sequelize, Sequelize);
db.station_account = require('./station_account.model.js')(sequelize, Sequelize);
db.people = require('./people.model.js')(sequelize, Sequelize);
db.vehicles = require('./vehicles.model.js')(sequelize, Sequelize);

module.exports = db;

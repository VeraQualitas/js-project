module.exports = (sequelize, Sequelize) => {
  const Station_account = sequelize.define("station_account", {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });
  return Station_account;
};
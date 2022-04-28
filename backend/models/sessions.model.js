module.exports = (sequelize, Sequelize) => {
  const Sessions = sequelize.define("sessions", {
    token: {
      type: Sequelize.STRING(80)
    },
    account_id: {
      type: Sequelize.INTEGER
    }
  });
  return Sessions;
};
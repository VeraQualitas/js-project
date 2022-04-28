module.exports = (sequelize, Sequelize) => {
  const Stations = sequelize.define("stations", {
    name: {
      type: Sequelize.STRING(30)
    },
    description: {
      type: Sequelize.TEXT
    }
  });
  return Stations;
};
module.exports = (sequelize, Sequelize) => {
  const Vehicles = sequelize.define("vehicles", {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });
  return Vehicles;
};
module.exports = (sequelize, Sequelize) => {
  const People = sequelize.define("people", {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });
  return People;
};
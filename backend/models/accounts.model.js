module.exports = (sequelize, Sequelize) => {
  const Accounts = sequelize.define("accounts", {
    email: {
      type: Sequelize.STRING(80)
    },
    password: {
      type: Sequelize.STRING(80)
    },
    firstname: {
      type: Sequelize.STRING(40)
    },
    lastname: {
      type: Sequelize.STRING(40)
    },
    phone: {
      type: Sequelize.STRING(20)
    }
  });
  return Accounts;
};
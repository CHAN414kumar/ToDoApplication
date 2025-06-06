const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "todo_application",
  "root",
  "Chandankumar9709885439@",
  {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
  }
);

module.exports.getUsers = async function () {
  try {
    await sequelize.authenticate();
    console.log("Get all Users");
    const [result, metadata] = await sequelize.query("SELECT * FROM todos");
    console.log(result);
  } catch (err) {
    console.log("Not able to fetch all users");
  }
};

module.exports.updateUser = async function () {
  try {
    await sequelize.authenticate();
    console.log("Update user by id");
    const [result, metadata] = await sequelize.query(
      'UPDATE todos SET todo_name="Complete MongoDB" where id = 5'
    );
    return metadata;
  } catch (err) {
    console.log("Not able to update user");
  }
};

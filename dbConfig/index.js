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
    return result;
  } catch (err) {
    console.log("Not able to fetch all users");
  }
};

module.exports.updateUser = async function (userId, work, name) {
  try {
    await sequelize.authenticate();
    console.log("Update user by id=" + userId);
    const [result, metadata] = await sequelize.query(
      `UPDATE todos SET todo_name="${work}" WHERE id = ${userId}`
    );
  } catch (err) {
    console.log("Not able to update user");
  }
};

module.exports.addUser = async function (todo_name, todo_user) {
  try {
    await sequelize.authenticate();
    const [result, metadata] = await sequelize.query(
      `INSERT INTO todos (todo_name,todo_user) VALUES("${todo_name}","${todo_user}")`
    );
  } catch (err) {
    console.log("Not able to add user");
  }
};

module.exports.deleteUser = async function (userId) {
  try {
    await sequelize.authenticate();

    const [result, metadata] = await sequelize.query(
      `DELETE FROM todos WHERE id=${userId}`
    );

    console.log(metadata);
  } catch (err) {
    console.log("Not able to delete user");
  }
};

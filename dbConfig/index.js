const { Sequelize, Model, DataTypes } = require("sequelize");
const dotenv = require("dotenv").config();
const { Op } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_name,
  process.env.DATABASE_root,
  process.env.DATA_PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.DIALECT,
  }
);

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    todo_name: {
      type: DataTypes.STRING,
    },
    todo_user: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "todos",
    timestamps: false,
  }
);

module.exports.getUsers = async function () {
  try {
    await sequelize.authenticate();
    console.log("Get all Users");
    const result = await User.findAll();
    console.log(result);
    return result;
  } catch (err) {
    console.log("Not able to fetch all users");
    return "can`t retrive data";
  }
};

module.exports.updateUser = async function (userId, work, name) {
  try {
    await sequelize.authenticate();
    console.log("Update user by id=" + userId);
    // const [result, metadata] = await sequelize.query(
    //   `UPDATE todos SET todo_name="${work}" WHERE id = ${userId}`
    // );
    const result = await User.update(
      {
        todo_name: work,
      },

      {
        where: {
          id: userId,
        },
      }
    );
    return "updated";
  } catch (err) {
    console.log("Not able to update user");
    return "Not updated";
  }
};

module.exports.addUser = async function (todo_name, todo_user) {
  try {
    await sequelize.authenticate();
    // const [result, metadata] = await sequelize.query(
    //   `INSERT INTO todos (todo_name,todo_user) VALUES("${todo_name}","${todo_user}")`
    // );

    const result = await User.create({
      todo_name: todo_name,
      todo_user: todo_user,
    });
    return "added";
  } catch (err) {
    console.log("Not able to add user");
    return "Not able to add";
  }
};

module.exports.deleteUser = async function (userId) {
  try {
    await sequelize.authenticate();

    // const [result, metadata] = await sequelize.query(
    //   `DELETE FROM todos WHERE id=${userId}`
    // );

    const result = await User.destroy({
      where: {
        id: userId,
      },
    });

    return "Deleted";
  } catch (err) {
    console.log("Not able to delete user");
    return "Can`t delete";
  }
};

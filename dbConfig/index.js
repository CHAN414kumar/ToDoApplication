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

const Todo = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    todo_name: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
  },
  {
    tableName: "todo",
    timestamps: false,
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
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "users",
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

module.exports.updateUser = async function (id, name) {
  try {
    await sequelize.authenticate();

    // const [result, metadata] = await sequelize.query(
    //   `UPDATE todos SET todo_name="${work}" WHERE id = ${userId}`
    // );
    const result = await User.update(
      {
        name: name,
      },

      {
        where: {
          id: id,
        },
      }
    );
    return "updated";
  } catch (err) {
    console.log("Not able to update user");
    return "Not updated";
  }
};

module.exports.addUser = async function (name) {
  try {
    await sequelize.authenticate();
    // const [result, metadata] = await sequelize.query(
    //   `INSERT INTO todos (todo_name,todo_user) VALUES("${todo_name}","${todo_user}")`
    // );

    const result = await User.create({
      name: name,
    });
    return "added";
  } catch (err) {
    console.log("Not able to add user");
    return "Not able to add";
  }
};

module.exports.deleteUser = async function (Id) {
  try {
    await sequelize.authenticate();

    // const [result, metadata] = await sequelize.query(
    //   `DELETE FROM todos WHERE id=${userId}`
    // );

    const result = await User.destroy({
      where: {
        id: Id,
      },
    });

    return "Deleted";
  } catch (err) {
    console.log("Not able to delete user");
    return "Can`t delete";
  }
};

//for todo table
module.exports.getTodos = async function () {
  try {
    await sequelize.authenticate();
    console.log("Get all todos");
    const result = await Todo.findAll();
    return result;
  } catch (err) {
    console.log(err);
    return "Not able to fetch";
  }
};

module.exports.addTodo = async function (todo_name, user_id) {
  try {
    await sequelize.authenticate();
    const result = await Todo.create({
      todo_name: todo_name,
      user_id: user_id,
    });
    return "Added successfully";
  } catch (err) {
    return "Not able to add";
  }
};

module.exports.updateTodo = async function (id, todo_name, user_id) {
  try {
    await sequelize.authenticate();
    const result = await Todo.update(
      {
        todo_name: todo_name,
        user_id: user_id,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return "Updated todo";
  } catch (err) {
    return "Not able to update";
  }
};

module.exports.deleteTodo = async function (id) {
  try {
    await sequelize.authenticate();

    const result = await Todo.destroy({
      where: {
        id: id,
      },
    });
    return "Deleted Todo";
  } catch (err) {
    return "Not able to Delete";
  }
};

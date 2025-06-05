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

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("connected");
    const [result, metadata] = await sequelize.query("SELECT * FROM todos");
    console.log(result);
  } catch (err) {
    console.log("Not");
  }
}

testConnection();

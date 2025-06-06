const Hapi = require("@hapi/hapi");
const Connection = require("./dbConfig");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  server.route([
    {
      method: "GET",
      path: "/",
      handler: (request, h) => {
        return "Hello World!";
      },
    },
    {
      method: "GET",
      path: "/getUsers",
      handler: () => {
        const allUsers = Connection.getUsers();
        console.log(allUsers);
        return "hi";
      },
    },
    {
      method: "GET",
      path: "/updateUser",
      handler: () => {
        const updateUser = Connection.updateUser();
        console.log(updateUser);
        return "User get updated";
      },
    },
  ]);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();

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
      handler: async (request, h) => {
        const allUsers = await Connection.getUsers();
        console.log(allUsers);
        return h.response(allUsers);
      },
    },
    {
      method: "PUT",
      path: "/updateUser/{id}",
      handler: async (request, h) => {
        let userId = request.params.id;
        let todo_name = request.payload.todo_name;
        let todo_user = request.payload.todo_user;
        console.log(userId);

        const updateUser = await Connection.updateUser(
          userId,
          todo_name,
          todo_user
        );

        return h.response(updateUser);
      },
    },
    {
      method: "POST",
      path: "/addUser",
      handler: async (request, h) => {
        let todo_name = request.payload.todo_name;
        let todo_user = request.payload.todo_user;

        const addUser = await Connection.addUser(todo_name, todo_user);

        return h.response(addUser);
      },
    },
    {
      method: "DELETE",
      path: "/deleteUser/{id}",
      handler: async (request, h) => {
        let userId = request.params.id;

        const deleteUser = await Connection.deleteUser(userId);
        return h.response(deleteUser);
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

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
        let id = request.params.id;
        let name = request.payload.name;

        const updateUser = await Connection.updateUser(id, name);

        return h.response(updateUser);
      },
    },
    {
      method: "POST",
      path: "/addUser",
      handler: async (request, h) => {
        let name = request.payload.name;

        const addUser = await Connection.addUser(name);

        return h.response(addUser);
      },
    },
    {
      method: "DELETE",
      path: "/deleteUser/{id}",
      handler: async (request, h) => {
        let Id = request.params.id;

        const deleteUser = await Connection.deleteUser(Id);
        return h.response(deleteUser);
      },
    },
    {
      method: "GET",
      path: "/getTodos",
      handler: async (request, h) => {
        const getTodos = await Connection.getTodos();
        return h.response(getTodos);
      },
    },
    {
      method: "POST",
      path: "/addTodo",
      handler: async (request, h) => {
        let todo_name = request.payload.todo_name;
        let user_id = request.payload.user_id;
        const addTodo = await Connection.addTodo(todo_name, user_id);
        return h.response(addTodo);
      },
    },
    {
      method: "PUT",
      path: "/updateTodo/{id}",
      handler: async (request, h) => {
        let id = request.params.id;
        let todo_name = request.payload.todo_name;
        let user_id = request.payload.user_id;

        const updatTodo = await Connection.updateTodo(id, todo_name, user_id);
        return h.response(updatTodo);
      },
    },
    {
      method: "DELETE",
      path: "/deleteTodo/{id}",
      handler: async (request, h) => {
        let id = request.params.id;

        const deleteTodo = await Connection.deleteTodo(id);
        return h.response(deleteTodo);
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

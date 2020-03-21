import SocketIO from "socket.io";

function onRequest (name, handler) {
  this.on(name, async (responseId, ...args) => {
    const handlerResponse = handler(...args);
    const response = (handlerResponse instanceof Promise)
      ? (await handlerResponse)
      : handlerResponse;

    console.log("response", responseId, response, args);
    this.emit("response", responseId, response);
  });
}

export default server => {
  const sockets = SocketIO(server, { wsEngine: "ws" });

  sockets.on("connection", function (socket) {
    socket.onRequest = onRequest.bind(socket);

    console.log("socket conntected", socket.id);

    socket.broadcast.emit("new_user", socket.id);
    socket.emit("data", "hello ASSHOLE");


    socket.on("message", function message(data) {
      console.log("data", data, socket.id);

      socket.emit(data + " was received");
    });

    socket.onRequest("login", creds => {
      console.log("login", creds);

      return { user: creds };
    });

    socket.on("disconnect", function message(data) {
      console.log("socket stopped", data, socket.id);
      socket.broadcast.emit("user_disconnected", socket.id);
    });
  });

  sockets.on("disconnection", function (socket) {
    console.log("disconnected", socket.id);
  });

  sockets.on("data", function message(data) {
    console.log("Received a new message from client", data);
  });
};

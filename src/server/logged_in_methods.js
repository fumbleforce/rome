import Hidden from "hidden_server";

export default (obj) => Object.fromEntries(Object.entries(obj).map(([key, func]) => [
  key,
  Hidden.method(key, (socket, ...args) => {
    if (!socket.userId) throw new Hidden.Error("login_required");
    return func(socket, ...args);
  })
]));
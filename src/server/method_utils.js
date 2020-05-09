import Hidden from "hidden_server";
import mapValues from "lodash/mapValues";

// Only logged-in users can use these methods
export const loggedInMethods = (obj) => mapValues(obj, (func, key) =>
  Hidden.method(key, (socket, ...args) => {
    if (!socket.userId) throw new Hidden.Error("login_required");
    return func(socket, ...args);
  })
);
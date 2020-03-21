import io from "socket.io-client/dist/socket.io";
import nanoid from "nanoid";
// import "./global.pcss";

const socket = io("http://localhost:3001");

const MAX_TIMEOUT = 5000;

socket.on("error", function error(err) {
  console.error("Something horrible has happened", err.stack);
});

socket.on("open", function open() {
  console.log("Connection is alive and kicking");
  socket.emit("message", "hello");
});

socket.on("reconnected", function (opts) {
  console.log("It took %d ms to reconnect", opts.duration);
});

socket.on("data", function message(data) {
  console.log("data", data);
});

socket.on("new_user", function message(data) {
  console.log("new_user", data);
});

socket.on("user_disconnected", function message(data) {
  console.log("user_disconnected", data);
});

const awaitingResponse = {};

socket.on("response", (responseId, data) => {
  console.log("[response]", responseId, data);
  const waiter = awaitingResponse[responseId];

  if (!waiter) {
    console.warn("[response] unhandled", responseId, data);
  } else {
    console.log("[response] handled", responseId, data);
    waiter.resolve(data);
    clearTimeout(waiter.timeout);
  }


  delete awaitingResponse[responseId];
});

export function request (messageName, data) {
  const responseId = `${messageName}__${nanoid()}`;

  const waiter = awaitingResponse[responseId] = {};

  const promise = new Promise ((resolve, reject) => {
    waiter.resolve = resolve;
    waiter.reject = reject;
  });

  socket.emit(messageName, responseId, data);

  waiter.timeout = setTimeout(() => {
    console.log("[emit] checking timeout", responseId);

    if (responseId in awaitingResponse) {
      console.error("[emit] timeout", responseId);
      awaitingResponse[responseId].reject("TIMEOUT");
      delete awaitingResponse[responseId];
    }
  }, MAX_TIMEOUT);

  console.log("[emit]", messageName, responseId, data, promise);
  return promise;
}


export default socket;
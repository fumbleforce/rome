import socketServer from "./socket_server.js";
import httpServer from "./http_server.js";

const { NODE_ENV = "development" } = process.env;

const dev = NODE_ENV === "development";

const server = httpServer(dev);
socketServer(server);

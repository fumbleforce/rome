import socket from "./socket";

export function login(creds) {
  return socket.request("user.login", creds);
}

export function register(creds) {
  return socket.request("user.register", creds);
}

export function resume(sessionId) {
  return socket.request("user.resume", sessionId);
}

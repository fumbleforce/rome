import socket from "./socket";

export function getGame (gameId) {
  return socket.request("game.get", gameId);
}

export function getGames () {
  return socket.request("game.unstarted");
}

export function startGame () {
  return socket.request("game.start");
}

export function leaveGame (id) {
  return socket.request("game.leave", id);
}

export function joinGame (id) {
  return socket.request("game.join", id);
}

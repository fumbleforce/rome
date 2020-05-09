import { collection } from "hidden_mongo";

export const User = collection("users", {
  transformFindOne ({ passwordHash, ...result }) {
    return result;
  }
});

export const Game = collection("games");

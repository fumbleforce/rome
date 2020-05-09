import { collection } from "hidden_mongo";

export const User = collection("users", {
  transformFindOne ({ passwordHash, ...result }) {
    console.log("Transforming user", result);
    return result;
  }
});

export const Game = collection("games");

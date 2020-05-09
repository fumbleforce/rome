import { collection } from "hidden_mongo";

export const User = collection("users", {
  // Remove password hash from normal queries to avoid accidentally showing it.
  // Full user can still be retrieved using _findOne.
  transformFindOne ({ passwordHash, ...result }) {
    return result;
  }
});

export const Game = collection("games");

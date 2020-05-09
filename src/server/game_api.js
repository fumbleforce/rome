import { Game } from "./collections";

export const getUnstartedGames = async () =>
  await Game.find({ started: { $ne: true } }).toArray();

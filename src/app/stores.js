import { readable, writable } from "svelte/store";
import { persistentString, syncedObject } from "./store_utils";

export const session = persistentString("session", null);

export const user = syncedObject("user");
export const game = syncedObject("game");

export const gamePage = writable("home");

export const time = readable(new Date(), function start(set) {
  const interval = setInterval(() => set(new Date()), 1000);

  return function stop() {
    clearInterval(interval);
  };
});

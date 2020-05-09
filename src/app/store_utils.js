import { writable, readable } from "svelte/store";
import isObject from "lodash/isObject";
import isNull from "lodash/isNull";
import isUndefined from "lodash/isUndefined";
import socket from "./socket";

export const persistentObject = (key, startValue) => {
  if (!key || typeof startValue === "undefined")
    throw new Error("Persistent store needs key and startValue");

  const { subscribe, set, ...rest } = writable(startValue);

  const json = localStorage.getItem(key);

  if (json) {
    console.log("Setting persistent", key, json);
    try {
      const data = JSON.parse(json);
      set(data);
    } catch (e) {
      console.error("Invalid existing data", key, json);
      set(null);
    }
  }

  subscribe(current => {
    if (isNull(current) || isUndefined(current)) {
      localStorage.removeItem(key);
    } else if (isObject(current)) {
      localStorage.setItem(key, JSON.stringify(current));
    } else {
      console.error("Invalid saved item", key, current);
    }
  });

  return {
    subscribe,
    set,
    ...rest
  };
};

export const persistentString = (key, startValue) => {
  if (!key || typeof startValue === "undefined")
    throw new Error("Persistent store needs key and startValue");

  const { subscribe, set, ...rest } = writable(startValue);

  const val = localStorage.getItem(key);
  console.log(key, val);

  if (!isNull(val)) {
    set(val);
  }

  subscribe(current => {
    if (isNull(current) || isUndefined(current)) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, current);
    }
  });

  return {
    subscribe,
    set,
    ...rest
  };
};

export const syncedObject = (channel) => {
  const updateKey = `${channel}::update`;
  const setKey = `${channel}::set`;

  console.log(`[sync] ${channel}`);

  return readable(null, (set) => {
    let lastVal = null;

    socket
      .on(updateKey, (update) => {
        console.log(`[${updateKey}]`, update);

        lastVal = { ...lastVal, ...update };

        set(lastVal);
      })
      .on(setKey, (value) => {
        console.log(`[${setKey}]`, value);

        lastVal = value;
        set(lastVal);
      });

    return () => {
      lastVal = null;
      socket.off(updateKey);
      socket.off(setKey);
    };
  });
};

import nanoid from "nanoid";
import {
  getObject,
  getString,
  setObject,
  setString,
  removeKey,
} from "hidden_redis";

export const getSession = async (sessionId) => await getObject(sessionId);

export const removeSession = async (sessionId) => await removeKey(sessionId);

export const getLatestSession = async (userId) => await getString(`${userId}:session`);

export const removeLatestSession = async (userId) => {
  const sessionId = await getLatestSession(userId);

  if (sessionId) {
    await removeKey(sessionId);
    await removeKey(`${userId}:session`);
  }
};

export const createSession = async (userId) => {
  removeLatestSession(userId);

  const id = `sessions:${nanoid()}`;

  // Double binding ensures that only the latest session is valid.
  // Otherwise we could end up with a large number of valid session keys.
  await setObject(id, { userId, createdAt: new Date() });
  await setString(`${userId}:session`, id);

  return id;
};

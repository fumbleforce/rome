import Hidden from "hidden_server";
import { User, Game } from "./collections";
import {
  createUser,
  loginUser,
} from "./user_api";
import {
  getLatestSession,
  createSession,
  getSession,
  removeLatestSession,
  removeSession,
} from "./session_api";


Hidden.methods({
  async "user.login" (socket, creds) {
    const user = await loginUser(creds);
    const sessionId = await createSession(user._id);

    socket.userId = user._id;
    socket.sessionId = sessionId;

    socket
      .sub("user", user._id)
      .set("user", user);

    return { user, sessionId };
  },

  async "user.resume" (socket, sessionId) {
    const session = await getSession(sessionId);

    if (!session) {
      throw new Hidden.Error("Invalid session");
    }

    const { userId } = session;
    const latestSessionId = await getLatestSession(userId);

    console.log({sessionId, session, userId, latestSessionId});

    if (sessionId !== latestSessionId) {
      removeLatestSession(userId);
      removeSession(sessionId);

      throw new Hidden.Error("Expired session");
    }

    const user = await User.findOne(userId);

    if (!user) {
      removeLatestSession(userId);

      throw new Hidden.Error("Invalid user");
    }
    
    console.log("Resume", user, userId, session, sessionId);

    socket
      .sub("user", user._id)
      .set("user", user, true)
      .set("userId", user._id, true)
      .set("sessionId", sessionId, true);

    if (user.gameId) {
      try {
        const game = await Game.findOne(user.gameId);

        socket
          .sub("game", game._id)
          .set("game", game);
      } catch (e) {
        console.error(e);
        await User.updateOne(user._id, { $unset: { gameId: 1 } });
      }
    }

    return { user, sessionId };
  },

  async "user.register" (socket, creds) {
    const user = await createUser(creds);
    const sessionId = await createSession(user._id);

    socket
      .set("user", user, true)
      .set("userId", user._id, true)
      .set("sessionId", sessionId, true);

    return { user, sessionId };
  },
});

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

function setSocketUser (socket, user, sessionId) {
  socket.userId = user._id;
  socket.sessionId = sessionId;

  // The client now receives all updates to this user
  User.sub(socket, "user", user._id, user);

  socket
    .set("userId", user._id)
    .set("sessionId", sessionId);
}

Hidden.methods({
  async "user.login" (socket, creds) {
    const user = await loginUser(creds);
    const sessionId = await createSession(user._id);

    setSocketUser(socket, user, sessionId);

    return { user, sessionId };
  },

  async "user.resume" (socket, sessionId) {
    const session = await getSession(sessionId);

    if (!session) {
      throw new Hidden.Error("Invalid session");
    }

    const { userId } = session;
    const latestSessionId = await getLatestSession(userId);

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

    setSocketUser(socket, user, sessionId);

    if (user.gameId) {
      try {
        const game = await Game.findOne(user.gameId);

        Game.sub(socket, "game", game._id, game);
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

    setSocketUser(socket, user, sessionId);

    return { user, sessionId };
  },
});

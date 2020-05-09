import pull from "lodash/pull";
import loggedInMethods from "./logged_in_methods";
import { User, Game } from "./collections";
import { getUnstartedGames } from "./game_api";

loggedInMethods({
  async "game.start" (socket) {
    const userId = socket.userId;
    console.log(socket);

    const game = {
      players: [userId],
      createdAt: new Date()
    };

    const gameId = await Game.insertOne(game);
    console.log("gameId", typeof gameId, gameId);
    game._id = gameId;

    await User.updateOne(userId, { $set: { gameId } });

    socket
      .update("user", { gameId }, true)
      .set("game", game);

    return true;
  },

  async "game.unstarted" (socket) {
    return await getUnstartedGames();
  },

  async "game.leave" (socket) {
    const gameId = socket.user.gameId;
    const userId = socket.userId;
    const game = await Game.findOne(gameId);

    await User.updateOne(socket.userId, { $set: { gameId: null } });

    if (!game) return true;

    pull(game.players, userId);

    if (!game.players.length) {
      await Game.deleteOne(gameId);
    } else {
      await Game.updateOne(gameId, {
        $set: { players: game.players }
      });
    }

    socket
      .update("user", { gameId: null }, true)
      .set("game", null);
  },

  async "game.join" (socket, gameId) {
    console.log(socket);
    const userId = socket.userId;

    const game = await Game.findOne(gameId);
    if (!game) return false;

    await User.updateOne(socket.userId, { $set: { gameId } });

    await Game.updateOne(gameId, {
      $addToSet: { players: userId }
    });

    socket
      .update("user", { gameId }, true)
      .sub("game", game._id)
      .set("game", game);
  },
});

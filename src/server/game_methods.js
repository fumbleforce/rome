import pull from "lodash/pull";
import { loggedInMethods } from "./method_utils";
import { User, Game } from "./collections";
import { getUnstartedGames } from "./game_api";

loggedInMethods({
  async "game.start" (socket) {
    const userId = socket.userId;

    const game = {
      players: [userId],
      createdAt: new Date()
    };

    const gameId = await Game.insertOne(game);
    game._id = gameId;

    await User.updateOne(userId, { $set: { gameId } });

    // The client now receives all updates to this game
    Game.sub(socket, "game", game._id, game);

    return true;
  },

  async "game.unstarted" (socket) {
    return await getUnstartedGames();
  },

  async "game.leave" (socket) {
    const userId = socket.userId;
    const user = await User.findOne(userId);
    const gameId = user.gameId;
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

    Game.unsub(socket, "game", game._id);
  },

  async "game.join" (socket, gameId) {
    const userId = socket.userId;

    const game = await Game.findOne(gameId);

    if (!game) return false;

    await User.updateOne(socket.userId, { $set: { gameId } });

    await Game.updateOne(gameId, {
      $addToSet: { players: userId }
    });

    // The client now receives all updates to this game
    Game.sub(socket, "game", game._id, game);
  },
});

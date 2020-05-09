import "./game_methods";
import "./user_methods";

import Hidden from "hidden_server";
import { User } from "./collections";

Hidden.startup(() => {
  User.watch().on("change", (...args) => {
    console.log("user change", args);
  });
});
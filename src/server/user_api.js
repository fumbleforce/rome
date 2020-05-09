import Hidden from "hidden_server";
import { User } from "./collections";
import { hash, hashCompare } from "./password_utils";

export const createUser = async (creds) => {
  const { password, email } = creds;

  const passwordHash = await hash(password);
  const userExists = await User.count({ email });

  if (userExists) {
    throw new Hidden.Error("User with this email already exists");
  }

  const user = { email, createdAt: new Date() };

  user._id = await User.insertOne({ ...user, passwordHash });

  return user;
};

export const loginUser = async (creds) => {
  const { email, password } = creds;

  let user = await User._findOne({ email });

  if (user) {
    const { passwordHash, ...userData } = user;
    const correctPassword = await hashCompare(password, passwordHash);

    if (correctPassword) {
      return userData;
    }
  }

  throw new Hidden.Error("User does not exist or password is wrong");
};

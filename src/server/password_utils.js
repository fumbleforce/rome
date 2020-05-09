import util from "util";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const hash = password => util.promisify(bcrypt.hash)(password, saltRounds);
export const hashCompare = util.promisify(bcrypt.compare);



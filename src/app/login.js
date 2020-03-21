import { request } from "./socket";

export function login(creds) {
  return request("login", creds);
}

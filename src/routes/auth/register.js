import * as api from "api.js";

export function post(req, res) {
	const user = req.body;
  console.log("request uer", user);

	if (user) {
		req.session.user = user;
	}
  console.log("response user", user);

	res.setHeader("Content-Type", "application/json");

	res.end(JSON.stringify({ user }));
}
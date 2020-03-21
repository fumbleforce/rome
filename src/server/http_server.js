import sirv from "sirv";
import Polka from "polka";
import compression from "compression";
import fs from "fs";

const { PORT = 3001 } = process.env;
const __dirname = fs.realpathSync(".");

const getFile = pathName => fs.readFileSync(`${__dirname}/${pathName}`, "utf-8");
const template = getFile("./public/index.html");

const HTMLRenderer = (req, res, next) => {
  res.renderHTMLFile = htmlFile => {
    try {
      res.setHeader("content-type", "text/html");
      res.end(htmlFile);
    } catch (err) {
      console.error(err);
      return res.end(err.message || err);
    }
  };
  next();
};

export default (dev) => {
  const serve = sirv("./public", { dev });
  const compress = compression({ threshold: 0 });

  const polka = Polka()
    .use(compress, serve, HTMLRenderer)
    .get("/", (req, res) => res.renderHTMLFile(template))
    .listen(PORT, err => {
      if (err) console.error("error", err);
      else console.log("Started server:", `localhost:${PORT}`);
    });

  const server = polka.server;

  return server;
};
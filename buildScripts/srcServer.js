import express from "express";
import path from "path";
import open from "open";
import webpack from "webpack";
import middleware from "webpack-dev-middleware";
// import { fileURLToPath } from "url";
import config from "../webpack.config.dev";

// eslint-disable-next-line no-underscore-dangle
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.NODE_ENV = "development";

const PORT = process.env.PORT || 3000;
const app = express();

// webpack compiler
const compiler = webpack(config);

// integrate webpack with express using middleware
app.use(
  middleware(compiler, {
    // noInfo: true,
    publicPath: config.publicPath,
  })
);

app.use(express.static(path.join(__dirname, "../src/")));

// routing to root index file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

// error handling
app.use((req, res) => {
  res.status(500).send("Something broke!");
});

// opens browser
app.listen(PORT, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  } else {
    open(`http://localhost:${PORT}`);
  }
});

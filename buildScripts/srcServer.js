import express from "express";
import path from "path";
import open from "open";
import webpack from "webpack";
import config from "../webpack.config.dev";

// const routes = require("../routes/main");

/* eslint-disable no-console */
const PORT = process.env.PORT || 3000;
const app = express();
// webpack compiler
const compiler = webpack(config);

// integrate webpack with express using middleware
app.use(
  require("webpack-dev-middleware")(compiler, {
    // noInfo: true,
    publicPath: config.output.publicPath,
  })
);

app.use(express.static(path.join(__dirname, "../src/")));

// app.use("/", routes);

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
    console.log(err);
  } else {
    open(`http://localhost:${PORT}`);
  }
});

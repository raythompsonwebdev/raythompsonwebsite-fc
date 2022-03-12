import express from "express";
import path from "path";
// import { fileURLToPath } from "url";
import open from "open";
import compression from "compression";

// const dirname = path.dirname(fileURLToPath(import.meta.url));

/* eslint-disable no-console */
const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "../dist/")));

// add gzip compression
app.use(compression());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

// opens browser
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});

const express = require("express");
const path = require("path");
// const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/index.cjs");

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, "../dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");
const mockResponse = {
  foo: "bar",
  bar: "foo",
};

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors());

app.use(express.static(DIST_DIR));

app.get("/api", (req, res) => {
  res.send(mockResponse);
});

app.get("/", (req, res) => {
  res.sendFile(HTML_FILE);
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});

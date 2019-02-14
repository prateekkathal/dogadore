import express from "express";
import React from "react";
import { renderToNodeStream } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import fs from "fs";
import App from "./../App";
import apiRouter from "./routes/api";
import {
  APP_PORT,
  MONGO_DB_URL,
  MONGO_DB_USER,
  MONGO_DB_PASS,
  MONGO_DB_NAME
} from "babel-dotenv";

/**
 * Init
 */
const PORT = APP_PORT || 3009;

const html = fs.readFileSync("./dist/index.html").toString();
const parts = html.split("Load Me Please!");

const app = express();

/**
 * MongoDB
 */
const mongoose = require("mongoose");
mongoose.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  user: MONGO_DB_USER,
  pass: MONGO_DB_PASS,
  dbName: MONGO_DB_NAME
});

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get the default connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB Connection Error: "));
db.once("open", () => {
  console.log("DB Connected Successfully!");
});

/**
 * App
 */
app.use("/dist", express.static("dist"));
app.use("/api", apiRouter);

app.use((req, res) => {
  res.write(parts[0]);

  const reactMarkup = (
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );

  const stream = renderToNodeStream(reactMarkup);

  stream.pipe(
    res,
    { end: false }
  );

  stream.on("end", () => {
    res.write(parts[1]);
    res.end();
  });
});

console.log(`listening on ${PORT}`);
app.listen(PORT);

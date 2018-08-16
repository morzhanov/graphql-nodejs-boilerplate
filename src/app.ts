import "reflect-metadata";
import { Application } from "express";
import { connect } from "./db";
import { GraphQLMiddleware } from "./middlewares/graphql";

const app: Application = require("express")();
const cors = require("cors");
const { json, urlencoded } = require("body-parser");

connect().then(connection => {
  console.log(`Database connected`);
  console.log(connection.options);

  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: false }));

  app.get("/", (req, res) => {
    res.sendFile("templates/index.html", { root: __dirname });
  });
  app.use("/api", GraphQLMiddleware);
});

if (app.get("env") !== "development") {
  const logger = require("morgan");
  app.use(logger("dev"));
}

if (app.get("env") === "production") {
  const helmet = require("helmet");
  app.use(helmet());
}

export default app;

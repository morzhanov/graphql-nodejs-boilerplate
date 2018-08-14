import http = require("http");
import async = require("async");
import Signals = NodeJS.Signals;
import { PORT } from "./constants";
import { NextFunction } from "express";
import ErrnoException = NodeJS.ErrnoException;
import app from "./app";
import { Server } from "http";

const signals = ["SIGINT", "SIGTERM"];
// create https server
const server: Server = http.createServer(app);

// listen server
server.listen(PORT);

// set listeners and error handlers
server.on("error", onError);
server.on("listening", onListening);

signals.forEach(function(signal: Signals) {
  process.once(signal, () => {
    async.waterfall([closeServer, closeDbConnection], closeApp);
  });
});

/**
 * Closes app and depends on err exit it with 0 or 1 status
 * @param  {Error} err - passed error
 */
function closeApp(err: Error) {
  console.log("Now application will be closed!", err || "");
  err ? process.exit(1) : process.exit(0);
}

/**
 * Closes application server
 * @param  {Function} next - next passed callback
 */
function closeServer(next: NextFunction) {
  console.log("Now server will be closed!");
  server.close(next);
}

/**
 * Closes db connection
 * @param  {Function} next - next passed callback
 */
function closeDbConnection(next: NextFunction) {
  console.log("Now db will be closed!");
}

/**
 * Logging server info on listening
 */
function onListening() {
  const addr: any = server.address();
  console.log(`Listening on port ${addr.port}`);
}

/**
 * Event listener for HTTP server "error" event.
 * @param  {Error} err - passed error
 */
function onError(err: ErrnoException) {
  if (err.syscall !== "listen") {
    throw err;
  }

  switch (err.code) {
    case "EACCES":
      console.log(`Port ${PORT} requires elevated privileges`);
      return process.exit(1);
    case "EADDRINUSE":
      console.log(`Port ${PORT} is already in use`);
      return process.exit(1);
    default:
      throw err;
  }
}

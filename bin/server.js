"use strict";

const fs = require("fs");
const express = require("express");

const app = express();
const router = express.Router();
app.use("/api", router);

//automap each api file to a route like Vercel seems to do.
fs.readdirSync("api", { encoding: "utf-8" }).forEach((file) => {
  if (file.indexOf(".") !== -1) {
    let route = "/" + file.split(".")[0];

    if (file === "index.js") {
      route = "/";
    }

    router.route(route).get(require("../api/" + file));
  }
});

const port = process.env.port || 8080;
app.listen(port, () => {
  console.log(`Express running on port ${port}`);
});

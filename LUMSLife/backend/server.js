const express = require("express");
const { json, urlencoded } = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config({ path: "../.env" });
const router = require("./routes/routes.js");

// creating the server
const app = express();

// enabling cors to allow for communication between different servers
app.use(cors());

// parsing incoming JSON requests and placing parsed data within req.body
app.use(json());
app.use(urlencoded({ extended: true }));

// printing any requests made to the server
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routing requests to the server using the router specified in routes/routes.js
app.use("/api/general", router);

// listening for any requests made to the server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

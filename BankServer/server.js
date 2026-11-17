require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDatabase = require("./database");

const loginAPI = require("./API/loginAPI");
const createAccountAPI = require("./API/createAccountAPI");
const depositAPI = require("./API/depositAPI");
const withdrawAPI = require("./API/withdrawAPI");
const transferAPI = require("./API/transferAPI");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function startServer() {
  const database = await connectDatabase();

  app.get("/", function (request, response) {
    response.send("Shanto Bank server is running");
  });

  app.post("/api/login", function (request, response) {
    loginAPI(request, response, database);
  });

  app.post("/api/create-account", function (request, response) {
    createAccountAPI(request, response, database);
  });

  app.post("/api/deposit", function (request, response) {
    depositAPI(request, response, database);
  });

  app.post("/api/withdraw", function (request, response) {
    withdrawAPI(request, response, database);
  });

  app.post("/api/transfer", function (request, response) {
    transferAPI(request, response, database);
  });

  app.listen(PORT, function () {
    console.log("Server running at http://localhost:" + PORT);
  });
}

startServer();
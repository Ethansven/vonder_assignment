const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const port = 5000;
app.use(express.json());
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
client.connect();
global.client = client;

app.post("/regis", require("./api/regis.js"));
app.post("/login", require("./api/login.js"));
app.post("/createRoom", require("./api/createRoom.js"));
app.get("/getAllRooms", require("./api/getAllRooms.js"));
app.get("/getRoom/:id", require("./api/getRoom.js"));

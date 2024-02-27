// Importing Express Router
import  express  from "express";
import  cors  from "cors";
import http from 'http'
import Terminal from "./Terminal.js";
import * as IO from "socket.io";
import os from"os";
import dotEnv from "dotenv";

console.log("started")
const app = express();

// Importing cors
app.use(cors());


// socket.io setup
const server = http.createServer(app);

export const io = new IO.Server(server, {
  transports: ["polling"],
  cors: {
    origin: "*",
  },
});

// socket connection
io.on("connection", (client) => {
  // console.log("socket ID:" + client.id);

  client.on("join", (data) => {
    console.log(data);
  });

  client.on("disconnect", () => {
    client.emit("message", "Bye from server");
  });
});


// use cors to allow cross origin resource sharing
app.use(function (req, res, next) {
  req.io = io;
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// use Terminal.js to handle the terminal requests
app.use("/terminal", Terminal(io));

app.get("/", (req, res) => {
  res.send("Just a Server Route");
});

// using PORT from env file or 5000 for local development
const PORT = process.env.PORT || 5000;
// System Information
dotEnv.config();

// ----- connect to server -----

server.listen(PORT, () => {
  console.log(`🚀 http://${os.hostname()}:${PORT}`);
});








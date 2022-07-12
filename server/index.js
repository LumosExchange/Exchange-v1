const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const { Server } = require("socket.io");
const http = require("http");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const S3 = require("aws-sdk/clients/s3");
const validation = require("./Middlewares/validationMiddlewear");
const userSchema = require("./Validations/userValidation");

require("dotenv").config();

const server = http.createServer(app);

//Setting up socket for chatroom
const io = new Server(server, {
  cors: {
    origin: "https://dev-api.lumos.exchange",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log('user connected: ', socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User with ID : ", socket.id, " joined the room: ", data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data);
    console.log("RECIEVE MESSAGE: ", data);
  });

  socket.on("submitImg", (data) => {
    console.log("Client Image sent");
    socket.to(data.room).emit("sentImg", data);
  });

  socket.on("disconnect", () => {
    // console.log("User Disconnected", socket.id);
  });
});

//Change this to randomly generate salt
const saltRounds = 10;

//needed to avoid cors errors
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://dev-api.lumos.exchange",
    "https://stage.lumos.exchange",
    "https://api.coingecko.com",
    "https://api.coingecko.com/api/v3/coins/markets"
  );
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  "Access-Control-Allow-Origin",
    // Pass to next layer of middleware
    next();
});

app.use(
  cors({
    origin: ["https://dev-api.lumos.exchange", "https://stage.lumos.exchange", "https://api.coingecko.com/api/v3/coins", "*"],
    methods: ["GET", "POST"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

//Initiate Imports
app.use(express.json());

//app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    key: "userId",
    secret: "generateARandomSentenceHere",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expries: 60 * 60 * 1,
    },
  })
);

// Connection deatils for DB
const db = mysql.createPool({
  connectionLimit: 100,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true,
});

app.use(require("./app/routes"));

server.listen(3002, () => {
  console.log("SERVER RUNNING");
});

app.listen(3001, () => {
  console.log("running on port 3001");
});

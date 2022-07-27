require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const local = require("./strategies/local");

// db connection
const db = require("./configs/db.config");

const app = express();

app.use(
  session({
    secret: "cookie",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000000 },
  })
); 

//Live chat with socket.io
// const server = require("./bin/www");
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

 io.on("connection",(socket)=>{
    console.log("we have a new connection for chatting!!!")

    socket.on("disconnect",()=>{
      console.log("user had left from chatting!")
    })

  })

//using middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/build")));
//process.env.NODE_ENV => production or undefined
// if(process.env.NODE_ENV === "production"){
//   app.use(express.static(path.join(__dirname, "client/build")));
// } else {
//   app.use(express.static(path.join(__dirname, "public")));
// }

// directory for router
const listingRouter = require("./routes/listings");
const listingsfilterRouter = require("./routes/listingsfilter");
const authRouter = require("./routes/auth");
const logoutRouter = require("./routes/logout");
const profileRouter = require("./routes/profile");
const registerRouter = require("./routes/register");
const myListingsRouter = require("./routes/mylistings");
const listedItemOfferingRouter = require("./routes/listedItemOffering");
const addAListingRouter = require("./routes/addalisting");
const makeOfferRouter = require("./routes/makeoffer");
const myOfferRouter = require("./routes/myoffer");
const historyRouter = require("./routes/history.js");
const messagesRouter = require("./routes/messages");
const mymessagesRouter = require("./routes/mymessages");

//routes
app.use("/auth", authRouter);
app.use("/auth", logoutRouter);
app.use("/register", registerRouter(db));
app.use("/", listingRouter(db));
app.use("/", listingsfilterRouter(db));
app.use("/", profileRouter(db));
app.use("/", myListingsRouter(db));
app.use("/", listedItemOfferingRouter(db));
app.use("/", addAListingRouter(db));
app.use("/", makeOfferRouter(db));
app.use("/", myOfferRouter(db));
app.use("/", historyRouter(db));
app.use("/", messagesRouter(db));
app.use("/", mymessagesRouter(db));

module.exports = app;

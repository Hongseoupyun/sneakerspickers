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
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

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
app.use("/api", listingRouter(db));
app.use("/api", listingsfilterRouter(db));
app.use("/api", profileRouter(db));
app.use("/api", myListingsRouter(db));
app.use("/api", listedItemOfferingRouter(db));
app.use("/api", addAListingRouter(db));
app.use("/api", makeOfferRouter(db));
app.use("/api", myOfferRouter(db));
app.use("/api", historyRouter(db));
app.use("/api", messagesRouter(db));
app.use("/api", mymessagesRouter(db));

module.exports = app;

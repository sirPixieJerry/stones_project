// PLEASE CHANGE IF NECCESSARY -->

// require express
const express = require("express");
// require compression
const compression = require("compression");
// require path
const path = require("path");
// require cookie-session
const cookieSession = require("cookie-session");
// require crypto random string
const cryptoRandomString = require("crypto-random-string");
// require multer
const multer = require("multer");
// require random string generator module (lookup!)
const uidSafe = require("uid-safe");
// // ---> require s3 file!
// const { upload } = require("./s3");
// require the secret
const secret =
    process.env.NODE_ENV == "production"
        ? process.env
        : require("../config.json");
// require db.js functions
// const {} = require("../sql/db");

// SETUP SOCKET.IO ❌
// const { Server } = require("http");

// SERVER SETUP:

// start the server
const app = express();
// socket.io implementation
// const server = Server(app);
// choose the port
const PORT = process.env.PORT || 3001;

// MIDDLEWARE SETUP

// setup to receive and parse JSON files
app.use(express.json());
// compresses th response
app.use(compression());
// serve static files in /public
app.use(express.static(path.join(__dirname, "..", "client", "public")));
// setup middleware to populate req.body with form data
app.use(express.urlencoded({ extended: false }));
// setup cookie-session
const session = cookieSession({
    name: "social-network-session",
    secret: secret.SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true,
});
app.use(session);
// Prevent Framing
app.use(function (req, res, next) {
    res.setHeader("x-frame-options", "deny");
    next();
});
// // setup multer uploader
// const storage = multer.diskStorage({
//     // specify directory folder for temp uploads
//     destination: (req, file, callback) => {
//         callback(null, path.join(__dirname, "uploads")); // null (if no err!)
//     },
//     // specify filename
//     filename: (req, file, callback) => {
//         // use uidSafe to generate filename ---> (24 digits)
//         uidSafe(24).then((randomId) => {
//             // build filename + ext from originalname property
//             const fileName = `${randomId}${path.extname(file.originalname)}`; // null (if no err!)
//             callback(null, fileName);
//         });
//     },
// });
// specify multer middleware ready to use!
// const uploader = multer({ storage });
// function to send code via email
// function sendEmailWithCode({ email, code }) {
//     console.log("[social:email] sending email with code", email, code);
//     // here you'll put the SES stuff
// }

// always last!
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// server listening to chosen port --> change to server if using socket.io
app.listen(PORT, function () {
    console.log(`I'm listening to ${PORT}...`);
});

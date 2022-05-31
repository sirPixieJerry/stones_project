// ----------------------------------------------------------------
// REQUIRE DEPENDENCIES--------------------------------------------
// ----------------------------------------------------------------

// require express
const express = require("express");
// require compression
const compression = require("compression");
// require path
const path = require("path");
// require cookie-session
const cookieSession = require("cookie-session");
// require the secret
const secret =
    process.env.NODE_ENV == "production"
        ? process.env
        : require("../config.json");
// require db.js functions
const { saveTexture } = require("../sql/db");

// ----------------------------------------------------------------
// SETUP SERVER----------------------------------------------------
// ----------------------------------------------------------------

// start the server
const app = express();
// socket.io implementation
// const server = Server(app);
// choose the port
const PORT = process.env.PORT || 3001;

// ----------------------------------------------------------------
// SETUP MIDDLEWARE------------------------------------------------
// ----------------------------------------------------------------

// API-------------------------------------------------------------

// setup to receive and parse JSON files
app.use(express.json());
// compresses th response
app.use(compression());
// serve static files in /public
app.use(express.static(path.join(__dirname, "..", "client", "public")));
// setup middleware to populate req.body with form data
app.use(express.urlencoded({ extended: false }));

// SECURITY---------------------------------------------------------

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

// ----------------------------------------------------------------
// ROUTES----------------------------------------------------------
// ----------------------------------------------------------------

// ________________________________________________________________
// GET ROUTES------------------------------------------------------

// GET CATCH ALL ROUTES--------------------------------------------
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// ________________________________________________________________
// POST ROUTES-----------------------------------------------------

// POST CANVAS DATA------------------------------------------------
app.post("/api/submit/canvas", (req, res) => {
    saveTexture(req.body.data)
        .then((rows) => {
            if (rows.length > 0) {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            res.status(400);
            return err;
        });
});

// ----------------------------------------------------------------
// SERVER LISTEN---------------------------------------------------
// ----------------------------------------------------------------

// server listening to chosen port
app.listen(PORT, function () {
    console.log(`I'm listening to ${PORT}...`);
});

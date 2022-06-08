// ----------------------------------------------------------------
// REQUIRE DEPENDENCIES--------------------------------------------
// ----------------------------------------------------------------

const express = require("express");
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const secret =
    process.env.NODE_ENV == "production"
        ? process.env
        : require("../config.json");

// do the same in db.js

// IMPORT QUERIES--------------------------------------------------
const {
    saveTexture,
    loadTexture,
    signUpUser,
    signInUser,
} = require("../sql/db");

// ----------------------------------------------------------------
// SETUP SERVER----------------------------------------------------
// ----------------------------------------------------------------

const app = express(); // start the server

const PORT = process.env.PORT || 3001; // choose port

// ----------------------------------------------------------------
// SETUP MIDDLEWARE------------------------------------------------
// ----------------------------------------------------------------

// ________________________________________________________________
// API-------------------------------------------------------------

// setup parse JSON
app.use(express.json());
// compress response
app.use(compression());
// serve static files
app.use(express.static(path.join(__dirname, "..", "client", "public")));
// populate req.body
app.use(express.urlencoded({ extended: false }));

// ________________________________________________________________
// SECURITY--------------------------------------------------------

// SESSION COOKIE--------------------------------------------------
const session = cookieSession({
    name: "social-network-session",
    secret: secret.SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true,
});
app.use(session);

// PREVENT FRAMING-------------------------------------------------
app.use(function (req, res, next) {
    res.setHeader("x-frame-options", "deny");
    next();
});

// ----------------------------------------------------------------
// ROUTES----------------------------------------------------------
// ----------------------------------------------------------------

// ________________________________________________________________
// GET ROUTES------------------------------------------------------

// GET SAVED TEXTURE FROM DB---------------------------------------
app.get("/api/load/texture", (req, res) => {
    loadTexture()
        .then((rows) => res.json(rows))
        .catch((err) => {
            res.status(400);
            return err;
        });
});

// GET USER SIGNIN USER FROM DB------------------------------------
app.get("/api/signin", (req, res) => {
    signInUser(req.body)
        .then((id) => {
            if (id == null) {
                res.json({ success: false });
            } else {
                req.session.id = id;
                res.json({ success: true });
            }
        })
        .catch((err) => {
            console.log(err);
            res.json({ success: false });
        });
});

// GET CATCH ALL ROUTES--------------------------------------------
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// ________________________________________________________________
// POST ROUTES-----------------------------------------------------

// POST CANVAS DATA------------------------------------------------
app.post("/api/submit/canvas", (req, res) => {
    saveTexture(req.body.data)
        .then((texture) => {
            if (texture) {
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

// POST SIGNUP USER------------------------------------------------
app.post("/api/signup", (req, res) => {
    signUpUser(req.body)
        .then((rows) => {
            req.session.id = rows.id;
            res.json({ success: true });
        })
        .catch((err) => {
            console.log(err);
            res.json({ success: false });
        });
});

// ----------------------------------------------------------------
// SERVER LISTEN---------------------------------------------------
// ----------------------------------------------------------------

// server listening to chosen port
app.listen(PORT, function () {
    console.log(`I'm listening to ${PORT}...`);
});

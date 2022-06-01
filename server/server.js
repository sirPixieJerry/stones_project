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

// IMPORT QUERIES--------------------------------------------------
const { saveTexture, loadTexture } = require("../sql/db");

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
    // console.log("REQ FROM APP");
    loadTexture()
        .then((rows) => {
            // console.log("ANSWER DB:", rows);
            return res.json(rows);
        })
        .catch((err) => {
            res.status(400);
            return err;
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

// ----------------------------------------------------------------
// SERVER LISTEN---------------------------------------------------
// ----------------------------------------------------------------

// server listening to chosen port
app.listen(PORT, function () {
    console.log(`I'm listening to ${PORT}...`);
});

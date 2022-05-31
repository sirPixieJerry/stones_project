// ----------------------------------------------------------------
// REQUIRE DEPENDENCIES--------------------------------------------
// ----------------------------------------------------------------

const spicedPg = require("spiced-pg");

// ----------------------------------------------------------------
// INITIALISE DATABASE---------------------------------------------
// ----------------------------------------------------------------

// INITIALISE ACCESS-----------------------------------------------

const { DB_USER, DB_PASSWORD, DB_NAME } = require("../config.json");

// SELECT ENVIROMENT-----------------------------------------------

let db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL); // production
} else {
    db = spicedPg(
        `postgres:${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}`
    ); // development

    console.log(`[db] Connecting to: ${DB_NAME}`);
}

// ----------------------------------------------------------------
// QUERIES---------------------------------------------------------
// ----------------------------------------------------------------

// ________________________________________________________________
// SELECT QUERIES--------------------------------------------------

// TEXTURE_DATA FROM TEXTURE_DATA----------------------------------
// --> specify later for user_id 🚨
function loadTexture() {
    console.log("REQ AT DB!");
    return db
        .query(`SELECT * FROM texture_data`, [])
        .then((result) => {
            console.log("DB QUERY:", result.rows);
            return result.rows[0];
        })
        .catch((err) => {
            console.log(err);
        });
}

// ________________________________________________________________
// INSERT QUERIES--------------------------------------------------

// INSERT TEXTURE_DATA TO TEXTURE_DATA-----------------------------
// --> specify later for user_id 🚨
function saveTexture(data) {
    return db
        .query(
            `INSERT INTO texture_data (texture_data)
    VALUES ($1)
    RETURNING *`,
            [data]
        )
        .then((result) => result.rows[0])
        .catch((err) => {
            console.log(err);
        });
}

// ________________________________________________________________
// EXPORT----------------------------------------------------------

module.exports = { saveTexture, loadTexture };

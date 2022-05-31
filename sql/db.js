// ----------------------------------------------------------------
// REQUIRE DEPENDENCIES--------------------------------------------
// ----------------------------------------------------------------

const spicedPg = require("spiced-pg");

// ----------------------------------------------------------------
// INITIALISE DATABASE---------------------------------------------
// ----------------------------------------------------------------

// require credentials from config.json
const { DB_USER, DB_PASSWORD, DB_NAME } = require("../config.json");

// decide if db runs in production or development
let db;
if (process.env.DATABASE_URL) {
    // production
    db = spicedPg(process.env.DATABASE_URL);
} else {
    // development
    db = spicedPg(
        `postgres:${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}`
    );
    console.log(`[db] Connecting to: ${DB_NAME}`);
}

// ----------------------------------------------------------------
// QUERIES---------------------------------------------------------
// ----------------------------------------------------------------

function saveTexture({ data }) {
    console.log("REQ AT SERVER!", data);
    return db
        .query(
            `INSERT INTO texture_data (texture_data)
    VALUES ($1)
    RETURNING *`,
            [data]
        )
        .then((result) => {
            console.log("RETURNING TO SERVER!");
            return result.rows[0];
        })
        .catch((err) => {
            console.log(err);
        });
}

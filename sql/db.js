// ----------------------------------------------------------------
// REQUIRE DEPENDENCIES--------------------------------------------
// ----------------------------------------------------------------

const spicedPg = require("spiced-pg");
const { hashPassword, matchPassword } = require("./bycrypt");

// ----------------------------------------------------------------
// INITIALISE DATABASE---------------------------------------------
// ----------------------------------------------------------------

// INITIALISE ACCESS-----------------------------------------------

// --> change later (see server secret!) 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨!

// SELECT ENVIROMENT-----------------------------------------------

let db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL); // production
} else {
    const { DB_USER, DB_PASSWORD, DB_NAME } = require("../config.json"); // --> change later (see server secret!) 🚨!
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
    // console.log("REQ AT DB!");
    return db
        .query(
            `SELECT * FROM texture_data 
        ORDER BY created 
        DESC LIMIT 1`,
            []
        )
        .then((result) => {
            // console.log("DB QUERY:", result.rows);
            return result.rows[0];
        })
        .catch((err) => {
            console.log(err);
        });
}

// USER DATA FROM USERS--------------------------------------------

function signInUser({ email, password }) {
    return db
        .query(
            `SELECT id, password_hash 
    FROM users 
    WHERE email =$1`,
            [email]
        )
        .then((result) => {
            if (!result.rows[0]) {
                // --> change later 🚨!
                return null;
            }
            const { id, password_hash } = result.rows[0];
            return matchPassword(password, password_hash, id);
        })
        .catch((err) => {
            console.log(err);
            return null; // --> change later 🚨!
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

// INSERT SIGNIN USER TO USERS-------------------------------------
function signUpUser({ first_name, last_name, email, password }) {
    return hashPassword(password).then((password_hash) => {
        return db
            .query(
                `INSERT INTO users (first_name, last_name, email, password_hash)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
                [first_name, last_name, email, password_hash]
            )
            .then((result) => result.rows[0])
            .catch((err) => console.log(err));
    });
}

// ________________________________________________________________
// EXPORT----------------------------------------------------------

module.exports = { saveTexture, loadTexture, signUpUser, signInUser };

// PLEASE CHANGE IF NECCESSARY -->

// require spiced-pg
const spicedPg = require("spiced-pg");
// require bycrypt functionality
const { hashPassword, matchPassword } = require("./bycrypt");
// require credentials from config.json
const { DB_USER, DB_PASSWORD, DB_NAME } = require("../config.json");

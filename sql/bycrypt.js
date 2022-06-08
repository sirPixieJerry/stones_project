// ----------------------------------------------------------------
// IMPORT DEPENDENCIES---------------------------------------------
// ----------------------------------------------------------------

const bcrypt = require("bcryptjs");

// ----------------------------------------------------------------
// BYCRYPT.JS FUNCTIONALITY----------------------------------------
// ----------------------------------------------------------------

// ________________________________________________________________
// HASH PASSOWRD---------------------------------------------------

module.exports.hashPassword = function (password) {
    return bcrypt.genSalt().then((salt) => bcrypt.hash(password, salt));
};

// ________________________________________________________________
// MATCH PASSOWRD AND PASSWORD HASH--------------------------------

module.exports.matchPassword = function (password, password_hash, id) {
    return bcrypt
        .compare(password, password_hash)
        .then((match) => {
            if (match) {
                return id;
            }
            return null;
        })
        .catch((err) => console.log(err));
};

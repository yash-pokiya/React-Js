const bcrypt = require("bcrypt");

const hashPass = async (password) => {
    return await bcrypt.hash(password, 10);
}

const comparePass = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

module.exports = {
    hashPass,
    comparePass
}
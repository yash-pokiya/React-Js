const jwt = require("jsonwebtoken");

const generateToken = async ({ email, id, role }) => {
    return await jwt.sign(
        {
            email,
            id,
            role
        },
        process.env.ACCESS_TOKEN_SECRET
        , {
            expiresIn: "1d"
        }
    )
}

module.exports = {
    generateToken
}
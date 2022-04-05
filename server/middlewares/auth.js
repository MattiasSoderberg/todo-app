const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET

// Fixa crash vid saknas header
const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization")

    if (authHeader && authHeader.split(" ")[0] === "Bearer") {
        const token = authHeader.split(" ")[1]
        req.user = jwt.verify(token, JWT_SECRET)
    }
    next()
}

module.exports = { verifyToken }
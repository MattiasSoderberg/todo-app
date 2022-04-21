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

const checkEmptyFields = (req, res, next) => {
    let fieldsValid = true
    Object.values(req.body).forEach(value => {
        if (!value) {
            fieldsValid = false
        }
    })
    if (fieldsValid) {
        next()
    } else {
        res.status(400).json({ message: "All fields requiered" })
    }
}

module.exports = { verifyToken, checkEmptyFields }
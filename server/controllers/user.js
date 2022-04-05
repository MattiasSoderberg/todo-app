const jwt = require("jsonwebtoken")
const { createUser, getUser, login } = require("../models/User")

const JWT_SECRET = process.env.JWT_SECRET

const createNewUser = async (req, res) => {
    const { username, password } = req.body

    if (username && password) {
        if (await getUser(username.toLowerCase())) {
            res.status(400).json({ message: "Username already exists" })
        } else {
            const user = await createUser({ username, password })
            res.status(201).json({ user: user.username })
        }
    } else {
        res.status(400).json({ message: "Username and password required" })
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body
    const user = await login(username, password)
    if (user) {
        const userId = user._id.toString()
        const token = jwt.sign({ userId, username: user.username }, JWT_SECRET, {
            expiresIn: "2h",
            subject: userId
        })
        res.json({ token })
    } else {
        res.sendStatus(400)
    }
}

const getLoggedInUser = async (req, res) => {
    const user = await getUser(req.user.username)
    if (user) {
        res.json(user)
    } else {
        res.sendStatus(400)
    }
}

module.exports = { createNewUser, loginUser, getLoggedInUser }
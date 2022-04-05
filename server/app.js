const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const userRouter = require("./routes/user")
const todoRouter = require("./routes/todo")

const { verifyToken } = require("./middlewares/auth")

const app = express()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI_LOCAL

mongoose.connect(MONGODB_URI)
    .then(() => {
        app.use(express.json())
        app.use(cors())
        app.use(verifyToken)

        app.use("/api/users", userRouter)
        app.use("/api/todos", todoRouter)

        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        })
    })
    .catch(err => {
        console.log("Mongo error:", err)
    })
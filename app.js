const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI_LOCAL

mongoose.connect(MONGODB_URI)
    .then(() => {
        app.listen(PORT, `Listening on port ${PORT}`)
    })
    .catch(err => {
        console.log("Mongo error:", err)
    })
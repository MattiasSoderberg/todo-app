const express = require("express")
const { createTags } = require("../controllers/tag")

const router = express.Router()

router.post("/", createTags)

module.exports = router
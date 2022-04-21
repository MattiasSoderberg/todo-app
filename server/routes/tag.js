const express = require("express")
const { createTags } = require("../controllers/tag")
const { checkEmptyFields } = require("../middlewares/auth")

const router = express.Router()

router.post("/", checkEmptyFields, createTags)

module.exports = router
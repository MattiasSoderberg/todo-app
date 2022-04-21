const express = require("express")
const { verifyToken, checkEmptyFields } = require("../middlewares/auth")
const { createNewUser, loginUser, getLoggedInUser } = require("../controllers/user")

const router = express.Router()

router.post("/", checkEmptyFields, createNewUser)
router.post("/token", checkEmptyFields, loginUser)
router.get("/me", getLoggedInUser)

module.exports = router
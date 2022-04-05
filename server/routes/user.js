const express = require("express")
const { verifyToken } = require("../middlewares/auth")
const { createNewUser, loginUser, getLoggedInUser } = require("../controllers/user")

const router = express.Router()

router.post("/", createNewUser)
router.post("/token", loginUser)
router.get("/me", getLoggedInUser)

module.exports = router
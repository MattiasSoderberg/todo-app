const express = require("express")
const { createNewTodo, listTodos, listCompletedTodos, toggleIsCompleted } = require("../controllers/todo")

const router = express.Router()

router.post("/create", createNewTodo)
router.get("/", listTodos)
router.get("/completed", listCompletedTodos)
router.get("/:id/complete", toggleIsCompleted)

module.exports = router
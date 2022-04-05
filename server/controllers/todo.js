const { createTodo, getOneTodo, getAllUncompletedTodos, getAllCompletedTodos } = require("../models/Todo")


const createNewTodo = async (req, res) => {
    const { title, abstract } = req.body
    const todo = await createTodo({ title, abstract, author: req.user.userId})

    if (todo) {
        res.json(todo)
    } else {
        res.sendStatus(400)
    }
}

const listTodos = async (req, res) => {
    const todos = await getAllUncompletedTodos(req.user.userId)

    if (todos) {
        res.json(todos)
    } else {
        res.sendStatus(400)
    }
}

const listCompletedTodos = async (req, res) => {
    const todos = await getAllCompletedTodos(req.user.userId)

    if (todos) {
        res.json(todos)
    } else {
        res.sendStatus(400)
    }
}

const toggleIsCompleted = async (req, res) => {
    const todo = await getOneTodo(req.params.id)
    if (todo) {
        todo.isCompleted = !todo.isCompleted
        await todo.save()
        res.json(todo)
    } else {
        res.sendStatus(400)
    }
}

module.exports = { createNewTodo, listTodos, listCompletedTodos, toggleIsCompleted }
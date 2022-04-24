const { createTodo, getOneTodo, getAllUncompletedTodos, getAllCompletedTodos, getCompletedTodosByTag, getUncompletedTodosByTag } = require("../models/Todo")
const { getTags, getTagByName } = require("../models/Tag")


const createNewTodo = async (req, res) => {
    const { title, abstract } = req.body
    const todo = await createTodo({ title, abstract, author: req.user.userId })
    const tags = await getTags(req.body.tags)
    if (tags) {
        tags.forEach(tag => todo.tags.addToSet(tag._id))
        await todo.save()
    }

    if (todo) {
        res.json(todo)
    } else {
        res.sendStatus(400)
    }
}

const listTodos = async (req, res) => {
    const tag = await getTagByName(req.query.filter)
    let todos
    if (tag) {
        todos = await getUncompletedTodosByTag(req.user.userId, tag._id)
        console.log(todos)
    } else {
        todos = await getAllUncompletedTodos(req.user.userId)
    }
    
    if (todos) {
        res.json({ todos })
    } else {
        res.sendStatus(400)
    }
}

const listCompletedTodos = async (req, res) => {
    const tag = await getTagByName(req.query.filter)
    console.log(tag)
    let todos
    if (tag) {
        todos = await getCompletedTodosByTag(req.user.userId, tag._id)
        console.log(todos)
    } else {
        todos = await getAllCompletedTodos(req.user.userId)
    }

    if (todos) {
        res.json({ todos })
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
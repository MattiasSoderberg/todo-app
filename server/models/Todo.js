const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    abstract: { type: String, required: true},
    content: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isCompleted: { type: Boolean, default: false },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }]
}, { timestamps: true })

const Todo = mongoose.model("Todo", todoSchema)

const createTodo = async (todoData) => {
    return await Todo.create(todoData)
}

const getAllUncompletedTodos = async (userId) => {
    return await Todo.find({ author: userId, isCompleted: false }).populate("tags").sort({ createdAt: -1 })
}

const getUncompletedTodosByTag = async (userId, filter) => {
    return await Todo.find({ author: userId, isCompleted: false, tags: {  $in: filter} }).populate("tags").sort({ createdAt: -1 })
}

const getAllCompletedTodos = async (userId) => {
    return await Todo.find({ author: userId, isCompleted: true }).populate("tags").sort({ createdAt: -1 })
}

const getCompletedTodosByTag = async (userId, filter) => {
    return await Todo.find({ author: userId, isCompleted: true, tags: {  $in: filter} }).populate("tags").sort({ createdAt: -1 })
}

const getOneTodo = async (todoId) => {
    return await Todo.findOne({ _id: todoId })
}

module.exports = { createTodo, getAllUncompletedTodos, getCompletedTodosByTag, getAllCompletedTodos, getUncompletedTodosByTag, getOneTodo }
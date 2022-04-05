const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    abstract: { type: String, required: true},
    content: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    isCompleted: { type: Boolean, default: false }
}, { timestamps: true })

const Todo = mongoose.model("Todo", todoSchema)

const createTodo = async (todoData) => {
    return await Todo.create(todoData)
}

const getAllUncompletedTodos = async (userId) => {
    return await Todo.find({ author: userId, isCompleted: false }).populate("author").sort({ createdAt: -1 })
}

const getAllCompletedTodos = async (userId) => {
    return await Todo.find({ author: userId, isCompleted: true}).sort({ createdAt: -1 })
}

const getOneTodo = async (todoId) => {
    return await Todo.findOne({ _id: todoId })
}

module.exports = { createTodo, getAllUncompletedTodos, getAllCompletedTodos, getOneTodo }
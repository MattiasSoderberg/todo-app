const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }
})

userSchema.pre("save", async function (next) {
    if (this.modifiedPaths().includes("password")) {
        const hash = bcrypt.hash(this.password, 10)
        this.password = hash
    }
    next()
})

const User = mongoose.model("User", userSchema)

const createUser = async (userdata) => {
    return await User.create(userdata)
}

const login = async (username, password) => {
    const user = await User.findOne({ username })
    if (user) {
        const passwordIsValid = await bcrypt.compare(password, user.password)
        if (passwordIsValid) return user
    }
    return null
}

module.exports = { createUser, login }
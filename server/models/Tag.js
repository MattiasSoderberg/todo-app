const mongoose = require("mongoose")

const tagSchema = mongoose.Schema({
    tag: { type: String, unique: true }
})

const Tag = mongoose.model("Tag", tagSchema)

const insertTags = async (tags) => {
    return await Tag.insertMany(tags)
}

const getTags = async (tags) => {
    return await Tag.find({ tag: { $in: tags } })
}

module.exports = { insertTags, getTags }
const mongoose = require("mongoose")

const tagSchema = mongoose.Schema({
    tag: { type: String, unique: true }
})

const Tag = mongoose.model("Tag", tagSchema)


const getTags = async (tags) => {
    return await Tag.find({ tag: { $in: tags } })
}

const insertTags = async (tags) => {
    await Tag.insertMany(tags)
    return await Tag.find()
}
module.exports = { insertTags, getTags }
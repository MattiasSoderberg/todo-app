const { insertTags } = require("../models/Tag")
const { getUserByUsername, updateUser } = require("../models/User")

const createTags = async (req, res) => {
    const user = await getUserByUsername(req.user.username)
    if (user) {
        try {
            const modifiedTags = req.body.tags.map(tag => ({ tag }))
            const tags = await insertTags(modifiedTags)
            if (tags) {
                tags.forEach(tag => user.tags.addToSet(tag._id))
                await user.save()
                // await updateUser(user.username, `{ $addToSet: { tags: { $ne: ${req.body.tags} } } }`)
                res.json({ tags })
            } else {
                res.sendStatus(400)
            }
        }
        catch (err) {
            res.status(400).json(err)
        }
    } else {
        res.sendStatus(403)
    }
}

module.exports = { createTags }
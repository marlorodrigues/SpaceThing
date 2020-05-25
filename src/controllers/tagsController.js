const Tags = require('../models/tags')

/*

    - This controller do the control direct of Tags,
    like creation, update and delete of the system,
    not do part of relation with table Thing

*/

module.exports = {

    //Tags is not being created here, is being created on time with Things (./Factory/Databse/Thing-Tag)
    async createTag(req, res) {
        try {
            const tag = req.body
            const { name } = req.body
            const thisNameExist = await Tags.findOne({ name })

            if (thisNameExist)
                return res.status(400).send({ error: "This tag name already exists" })

            const createdTag = await Tags.create(tag)

            return res.send({ CreatedTag: createdTag })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: "Failed add Tag in Thing" })
        }
    },

    async editTag(req, res) {
        try {
            const _id = req.params.tagId
            const { ...editThis } = req.body
            const thisIdExist = await Tags.findById(_id)

            if (!thisIdExist)
                return res.status(404).send({ error: "ID not found" })

            const editedTag = await Tags.findByIdAndUpdate(_id, { $set: editThis }, { new: true })

            return res.send({ EditedTag: editedTag })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: "Failed to edit Tag" })
        }
    },

    async deleteTag(req, res) {
        try {
            const _id = req.params.tagId
            const thisIdExist = await Tags.findById(_id)

            if (!thisIdExist)
                return res.status(404).send({ error: "ID not found" })

            await Tags.findOneAndRemove(_id)

            return res.send()
        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: "Failed to delete Tag" })
        }
    },

    async showMeOneTag(req, res) {
        try {
            const _id = req.params.tagId
            const thisIdExist = await Tags.findById(_id)

            if (!thisIdExist)
                return res.status(404).send({ error: "ID not found" })

            const tag = await Tags.findById(_id)

            return res.send({ tag })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: "Failed to get Tag" })
        }
    },

    async showMeAllThings(req, res) {
        try {
            const AllTags = await Tags.find()

            if (!AllTags)
                return res.status("Not Found Anything")

            return res.send({ AllTags })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: "Failed to get Tags" })
        }
    }
}

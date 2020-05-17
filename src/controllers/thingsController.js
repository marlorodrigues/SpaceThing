const Thing = require('../models/thing')

module.exports = {

    async createThing(req, res) {
        try {
            const { thing } = req.body
            const createdThing = await Thing.create(thing)

            return res.send({ CreatedThing: createdThing })

        } catch (error) {
            return res.status(400).send({ error: "Failed to Create Thing" });
        }
    },

    async editThing(req, res) {
        try {
            const _id = req.params.thingId
            const { ...editThis } = req.body
            const thisIdExist = await Thing.findById(_id)

            if (!thisIdExist)
                return res.status(404).send({ error: "ID not found" })

            const editedThing = await Thing.findByIdAndUpdate(_id, { $set: editThis }, { new: true })

            return res.send({ EditedThing: editedThing })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: "Failed to Edit Thing" });
        }
    },

    async deleteThing(req, res) {
        try {
            const _id = req.params.thingId
            const thisIdExist = await Thing.findById(_id)

            if (!thisIdExist)
                return res.status(404).send({ error: "ID not found" })

            await Thing.findOneAndRemove(_id)

            return res.send()
        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: "Failed to Delete Thing" });
        }
    },




    async addTag(req, res) {
        try {

        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: "Failed to remove Tag in Thing" })
        }
    },

    async removeTag(req, res) {
        try {

        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: "Failed to remove Tag in Thing" })
        }
    },

    async editTag(req, res) {
        try {

        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: "Failed to remove Tag in Thing" })
        }
    },





    async showMeOneThing(req, res) {
        try {
            const _id = req.params.thingId
            const thisIdExist = await Thing.findById(_id)

            if (!thisIdExist)
                return res.status(404).send({ error: "ID not found" })

            const thing = await Thing.findById(_id)

            return res.send({ thing })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: "Failed to get Thing" })
        }
    },

    async showMeAllThings(req, res) {
        try {
            const AllThings = await Thing.find()

            if (!AllThings)
                return res.status("Not Found anything")

            return res.send({ AllThings })
        } catch (error) {
            return res.status(400).send({ error: "Failed to get Thing" });
        }
    }
}
const Thing = require('../Factory/Database/Thing')
const Tag = require('../Factory/Database/Thing-Tag')

module.exports = {

    async createThing(req, res) {
        // const createdThing = await Thing.createThingInDB(req.body)

        // if (createdThing === "error")
        // return res.status(400).send({ error: "Failed to Create Thing" });

        console.log("Aqui mesmo")

        return res.send({ CreatedThing: "createdThing" })
    },

    async editThing(req, res) {
        const _id = req.params.thingId
        const { ...editThis } = req.body
        const editedThing = await Thing.updateThingInDB(_id, editThis)

        if (editedThing === "error")
            return res.status(400).send({ error: "Failed to Edit Thing" })

        return res.send({ EditedThing: editedThing })
    },

    async deleteThing(req, res) {
        const _id = req.params.thingId
        const removed = Thing.removeThingInDB(_id)

        if (removed === "error")
            return res.status(400).send({ error: "Failed to Delete Thing" });

        return res.send()
    },

    async showMeOneThing(req, res) {
        const _id = req.params.thingId
        const thing = await Thing.getOneThing(_id)

        if (thing === "error")
            return res.status(400).send({ error: "Failed to get Thing" })


        return res.send({ thing })
    },

    async showMeAllThings(req, res) {

        const AllThings = await Thing.getAllThings()

        if (AllThings === "error")
            return res.status(400).send({ error: "Failed to get Thing" })

        return res.send({ AllThings })
    }
}
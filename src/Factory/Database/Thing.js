const Thing = require('../../models/thing')
const Tag = require('./Tag')

module.exports = {

    async createThingInDB({ thing, tags }) {
        try {
            const creatingThing = await Thing.create(thing)

            Tag.addTag(creatingThing, tags)

            return
        } catch (error) {
            return "error"
        }
    },

    async updateThingInDB(_id, editThis) {
        try {
            const thisIdExist = await Thing.findById(_id)

            if (!thisIdExist)
                return "ID not found"

            return await Thing.findByIdAndUpdate(_id, { $set: editThis }, { new: true })

        } catch (error) {
            return "error"
        }
    },

    async removeThingInDB(_id) {
        try {
            const thisIdExist = await Thing.findById(_id)

            if (!thisIdExist)
                return "ID not found"

            return await Thing.findOneAndRemove(_id)
        } catch (error) {
            return "error"
        }
    },

    async getOneThing(_id) {
        try {
            const thisIdExist = await Thing.findById(_id)

            if (!thisIdExist)
                return "ID not found"

            return await Thing.findById(_id)

        } catch (error) {
            return "error"
        }
    },

    async getAllThings() {
        const AllThings = await Thing.find()

        if (!AllThings)
            return res.status("Not Found anything")

        return AllThings
    }

}

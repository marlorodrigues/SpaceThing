const Thing = require('../../models/thing')
const Tag = require('./Thing-Tag')

module.exports = {

    async createThingInDB({ thing, tags }) {
        try {
            const creatingThing = await Thing.create(thing)

            //Relationate Tag with Thing created
            return await Tag.addTag(creatingThing, tags)

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

    async updateTagInThing(_id, action) { // action => true - Add || false - remove

        try {
            if (action) {

            }
            else {

            }
        } catch (error) {

        }
    },

    async removeTagInThing(_id) {
        try {
            const thisIdExist = await Thing.findById(_id)

            if (!thisIdExist)
                return "ID not found"

            return await Thing.findOneAndRemove(_id)
        } catch (error) {
            return "error"
        }
    },

    async removeTagInThing(_id) {
        try {
            const thisIdExist = await Thing.findById(_id)

            console.log(thisIdExist)


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

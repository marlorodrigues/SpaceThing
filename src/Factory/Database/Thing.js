const Thing = require('../../models/thing')
const controllerThingTag = require('./Thing-Tag')

module.exports = {

    async createThingInDB({ thing, tags }) {
        try {
            const creatingThing = await Thing.create(thing)

            //Relationate controllerThingTag with Thing created
            return await controllerThingTag.addTags(creatingThing, tags)

        } catch (error) {
            return "error"
        }
    },

    async updateThingInDB(_id, editThis) {
        try {
            const thisIdExist = await Thing.findById(_id)
            const { tags } = editThis

            if (!thisIdExist)
                return "ID not found"

            const resultFirstStepOnUpdate = await Thing.findByIdAndUpdate(_id, { $set: editThis }, { new: true })

            // console.log(resultFirstStepOnUpdate);

            if (tags[1]) { //True Add New Tag
                return await controllerThingTag.addOneTag(resultFirstStepOnUpdate, tags[0])
            }
            else if (!tags[1]) { //False Remove One Tag
                return await controllerThingTag.removeTag(resultFirstStepOnUpdate, tags[0])
            }

            return resultFirstStepOnUpdate

        } catch (error) {
            return "error"
        }
    },

    async removeThingInDB(_id) {
        try {
            const thisIdExist = await Thing.findById(_id)

            if (!thisIdExist)
                return "ID not found"

            await Thing.remove(_id)

            return

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

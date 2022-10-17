const Thing = require('./thing.models')
const controllerThingTag = require('../tags/thing-tag.data')

const logger = require('../../services/logger')
const { currentDate } = require('../../utilities/date')

module.exports = {

    async createThingInDB({ thing, tags }) {
        try {
            const creatingThing = await Thing.create(thing)

            console.log("O id e -> " + creatingThing._id)
            //Relationate controllerThingTag with Thing created
            return await controllerThingTag.addTags(creatingThing, tags)

        } catch (error) {
            logger.error(`${currentDate()} - ${error.message} - ${error.stack}`)
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
            logger.error(`${currentDate()} - ${error.message} - ${error.stack}`)
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
            logger.error(`${currentDate()} - ${error.message} - ${error.stack}`)
        }
    },

    async getOneThing(_id) {
        try {
            const thisIdExist = await Thing.findById(_id)

            if (!thisIdExist)
                return "ID not found"

            return await Thing.findById(_id)

        } catch (error) {
            logger.error(`${currentDate()} - ${error.message} - ${error.stack}`)
        }
    },

    async getAllThings() {
        try {
            const AllThings = await Thing.find()

            if (!AllThings)
                return res.status("Not Found anything")

            return AllThings
        }
        catch (error) {
            logger.error(`${currentDate()} - ${error.message} - ${error.stack}`)
        }
    }
}

const Tags = require('../../models/tags')

module.exports = {

    async addTags(thing, tags) {
        try {
            await Promise.all(tags.map(async tag => {
                const _id = await Tags.findOne({ name: tag })

                if (_id) {
                    thing.Tags.push(_id);
                }
                else {
                    const creatingNewTag = new Tags({ name: tag });
                    await creatingNewTag.save();
                    thing.Tags.push(creatingNewTag);
                }
            }));

            return await thing.save();

        } catch (error) {
            console.log(error)
            return "error"
        }
    },

    async addOneTag(thing, tag) {
        try {
            const _id = await Tags.findOne({ name: tag })

            if (_id) {
                thing.Tags.push(_id);
            }
            else {
                const creatingNewTag = new Tags({ name: tag });
                await creatingNewTag.save();
                thing.Tags.push(creatingNewTag);
            }

            return await thing.save();

        } catch (error) {
            console.log(error)
            return "error"
        }
    },

    async getIdToRemove(tag) {
        try {
            const _id = await Tags.findOne({ name: tag })

            if (_id) {
                const { _id } = _id
                return _id
            }
            else {
                return
            }
        } catch (error) {
            console.log(error)
            return
        }
    },

    async removeTag(thing, tag) {
        try {
            const _id = await this.getIdToRemove(tag)

            if (_id) {
                var indexOfTag = thing.Tags.indexOf(_id);

                if (indexOfTag > -1) {
                    thing.Tags.splice(indexOfTag, 1);
                    return await thing.save();
                }
            }

            return "error"

        } catch (error) {
            console.log(error)
            return
        }
    }

}
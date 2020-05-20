const Tags = require('../../models/tags')

module.exports = {

    async addTag(thing, tags) {
        try {
            await Promise.all(tags.map(async tag => {
                const thisTagExists = await Tags.findOne({ name: tag })

                if (thisTagExists) {
                    thing.Tags.push(thisTagExists);
                }
                else {
                    const oneTag = new Tags({ name: tag });
                    await oneTag.save();
                    thing.Tags.push(oneTag);
                }
            }));

            return await thing.save();

        } catch (error) {
            console.log(error)
            return "error"
        }
    },

    async removeTag(thing, tag) {
        try {

        } catch (error) {
            console.log(error)
            return "error"
        }
    },

}
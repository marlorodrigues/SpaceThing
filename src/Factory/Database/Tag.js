const Tags = require('../../models/tags')

module.exports = {

    async addTag(thing, tags) {
        try {
            await Promise.all(tags.map(async tag => {
                const oneTag = new Tags([tag]);
                await oneTag.save();
                thing.Tags.push(oneTag);

                console.log({ tag })
            }));

            await thing.save();
            console.log(thing)
        } catch (error) {
            console.log(error)
        }
    },

    async editTag(thing, tag) {
        try {

        } catch (error) {

        }
    },

    async removeTag(thing, tag) {
        try {

        } catch (error) {

        }
    },

}
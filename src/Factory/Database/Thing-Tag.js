const Tags = require('../../models/tags')

async function getIdOfTag(tag) {
    try {
        const { _id } = await Tags.findOne({ name: tag })

        if (_id) {
            return _id
        }

        return
    } catch (error) {
        console.log(error)
        return
    }
}

async function thisTagAlreadyExistsIn(thing, _id) {
    try {
        var indexOfTag = thing.Tags.indexOf(_id);

        if (indexOfTag > -1) { // If here this id is already in table Tags in this Thing
            return true
        }

        return false // Else is not
    } catch (error) {
        console.log(error)
        return "error"
    }
}

module.exports = {

    async addTags(thing, tags) {
        try {
            await Promise.all(tags.map(async tag => {
                const { _id } = await Tags.findOne({ name: tag })

                if (_id) {
                    if (!await thisTagAlreadyExistsIn(thing, _id))
                        thing.Tags.push(_id)
                }
                else {
                    const creatingNewTag = new Tags({ name: tag })
                    await creatingNewTag.save()
                    thing.Tags.push(creatingNewTag)
                }
            }));

            await thing.save()

            return thing

        } catch (error) {
            console.log(error)
            return "error"
        }
    },

    async addOneTag(thing, tag) {
        try {
            const _id = await Tags.findOne({ name: tag })

            if (_id) {
                if (!await thisTagAlreadyExistsIn(thing))
                    thing.Tags.push(_id)
            }
            else {
                const creatingNewTag = new Tags({ name: tag })
                await creatingNewTag.save()
                thing.Tags.push(creatingNewTag)
            }

            await thing.save();

            return thing

        } catch (error) {
            console.log(error)
            return "error"
        }
    },

    async removeTag(thing, tag) {
        try {
            const _id = await getIdOfTag(tag)

            if (_id) {
                var indexOfTag = thing.Tags.indexOf(_id);

                if (indexOfTag > -1) {
                    thing.Tags.splice(indexOfTag, 1);
                    await thing.save();
                    return thing
                }
            }

            return "error"

        } catch (error) {
            console.log(error)
            return "error"
        }
    }
}

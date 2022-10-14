const mongoose = require('../../database/mongodb/index');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    createAt: {
        type: Date,
        default: Date.now
    }
})

const Tags = mongoose.model('Tags', tagSchema);

module.exports = Tags;

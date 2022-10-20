const _mongoose = require('mongoose');

const tagSchema = new _mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    createAt: {
        type: Date,
        default: Date.now
    }
})

const Tags = _mongoose.model('Tags', tagSchema);

module.exports = Tags;

const mongoose = require('../database/index');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    referenceThingsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    }],

    createAt: {
        type: Date,
        default: Date.now
    }
})

const Tags = mongoose.model('Tags', tagSchema);

module.exports = Tags;

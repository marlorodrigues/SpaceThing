const mongoose = require('../database/index');

const thingSchema = new mongoose.Schema([{

    name: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    type: {
        type: String,
        require: true
    },

    referenceLink: {
        type: String
    },

    Tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tags'
    }],

    Status: {                       //ver, rever, ja visto, ha algo interessante / see, review, already seen, something interesting
        type: String,
        require: true
    },

    createAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },

    private: {
        type: Boolean,
        default: false
    }
}]);

const Things = mongoose.model('Things', thingSchema);

module.exports = Things;

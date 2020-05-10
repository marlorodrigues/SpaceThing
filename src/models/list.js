const mongoose = require('../database/index');

const listSchema = new mongoose.Schema([{
    name: {                         //Name of thing
        type: String,
        require: true
    },
    description: {                  //Description what this do or what is it
        type: String,
        require: true
    },
    type: {                         //If is an task, link or other thing that you wanna remember later
        type: String,
        require: true
    },
    referenceLink: {                //Reference link of thing
        type: String
    },
    Tags: [{                        //Tags for found this
        type: String
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
    }
}]);

const List = mongoose.model('List', listSchema);

module.exports = List;

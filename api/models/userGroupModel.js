const mongoose = require("mongoose");
const userModel = require('./userModel');
const Schema = mongoose.Schema;

let userGroupSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    user_group: [
        {
            type: String,
        }
    ],
    created_by: {
        type: String,
        required: true,

    },
});

module.exports = mongoose.model('userGroup', userGroupSchema);
const mongoose = require("mongoose");
const projectModel = require('./projectModel');
const Schema = mongoose.Schema;

let projectModelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: false
    },
    description: {
        type: String,
        required: false,
    },
    created_by: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('projectModel', projectModelSchema);
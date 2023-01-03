const { timeStamp } = require("console");
const mongoose = require("mongoose");
const projectModel = require('./projectModel');
const Schema = mongoose.Schema;

let timeModelSchema = new Schema({
  
    time: {
        type: timeStamp,
        required: false
    },
    project: {
        type: projectModel,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('timeModel', timeModelSchema);
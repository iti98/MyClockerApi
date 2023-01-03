const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userGroupSchema = new Schema({
    Id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    userGroup: [
        type = String,
        required = true,
        userList = {
            firstname: string,
            lastname: string
          }
    ]
});

module.exports = mongoose.model('userGroup', userGroupSchema);
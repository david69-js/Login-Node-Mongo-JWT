const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const modelTasks = Schema({
    task: {require: true, type: String},
    description: String,
    completed: Boolean,
    userId: {type: Schema.ObjectId, ref: 'User'}
},{
    timestamps: true
})
module.exports = mongoose.model('Tasks', modelTasks)
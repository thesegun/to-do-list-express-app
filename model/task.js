var mongoose = require('mongoose')
var Schema = mongoose.Schema

let TaskSchema = new Schema({
	"taskName": String,
	"time": String,
	"description": String,
	"isCompleted": Boolean,
	"reminderTime": String
})

//export database

module.exports = mongoose.model('Task', TaskSchema)
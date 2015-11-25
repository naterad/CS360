// setup Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var findOrCreate = require('mongoose-findorcreate')

var User = require('./user.js');

// Project schema
var projectSchema = new Schema({
    user: {type: ObjectId, ref: 'users'},
    title: String,
    created: {type: Date, default: Date.now},
    due: {type: Date, default: Date.now},
    completed: Boolean,
});

// ensure schemas use virtual IDs
projectSchema.set('toJSON', {
    virtuals: true
});

// add findorCreate
projectSchema.plugin(findOrCreate);

// create item
var Project = mongoose.model('projects', projectSchema);

module.exports = Project;

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    userId: { type: String, require: true, },
    name: { type: String, require: true, },
    strict: { type: Boolean, require: true, default: false, },
    collaborators: { type: Array, default: [] },
})

module.exports = mongoose.model('Project', ProjectSchema);
const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
    skillName: String,
    skillPercent: Number
});

let Skills = module.exports = mongoose.model('Skills', skillsSchema);
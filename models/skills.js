const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
    skillName: String,
    skillPercent: Number
});

let User = module.exports = mongoose.model('Skills', skillsSchema);
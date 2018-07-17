const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
    cvFile: String,
    cvHtml: String,

});

let Cv = module.exports = mongoose.model('Cv', cvSchema);
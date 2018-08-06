const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
    projectTitle: String,
    projectDesc: String,
    projectDescShort: String,
    projectDetail: String,
    projectChallenges: String,
    projectLikes: String,
    projectImprovements: String,
    projectLinkTo: String,
    projectHeroImage: String,
    projectImageDesktop: String,
    projectImageMobile: String,
    projectScreenshot1: String,
    projectScreenshot2: String,
    projectScreenshot3: String

});

let Projects = module.exports = mongoose.model('Projects', projectsSchema);
const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', MovieSchema);
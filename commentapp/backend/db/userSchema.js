const mongoose = require('mongoose');
const socketSchema = new mongoose.Schema({
    title: { type: String, required: true },
    des: { type: String, required: true },

    comments: [{
        comment: {
            type: String,
        }, uid: { type: String },
        date: { type: Date, default: Date.now },
    }]

})

module.exports = mongoose.model("details", socketSchema);
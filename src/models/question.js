const mongoose = require('mongoose')

const qSchema = mongoose.Schema({
    ques: {
        type: String,
        unique: true
    },
    qOption: {
        type: Array,
        required: true,
    },
    cOption: {
        type: String,
        required: true,
    },
    quesType: {
        type: String,
        required: true
    }
})


qSchema.methods.toJSON = function() {
    const ques = this
    const quesData = ques.toObject()
    delete quesData.cOption
    return quesData
}


const question = mongoose.model('questions', qSchema)

module.exports = question
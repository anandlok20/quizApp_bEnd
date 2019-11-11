const mongoose = require('mongoose')

const tSchema = mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
    },
    quesArray: {
        type: Array,
        required: true,
    },
    score: {
        type: String,
        required: true,
    }
})


tSchema.methods.toJSON = function() {
    const test = this
    const testData = test.toObject()
    delete testData.quesArray
    return testData
}


const test = mongoose.model('test', tSchema)

module.exports = test
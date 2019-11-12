const mongoose = require('mongoose')

const tSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    quesType: {
        type: Number,
        required: true
    },
    score: {
        type: Number
    }
})


// tSchema.methods.toJSON = function() {
//     const test = this
//     const testData = test.toObject()
//     delete testData.quesArray
//     return testData
// }


const test = mongoose.model('test', tSchema)

module.exports = test
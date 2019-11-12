const req = require('request')

const questionList = ((qconfig, callback) => {
    // console.log(qconfig)
    const url_gl = "https://opentdb.com/api.php?amount=" + qconfig.amount + "&category=" + qconfig.category + "&difficulty=" + qconfig.difficulty + "&type=multiple";
    // console.log(url_gl)
    req({ url: url_gl, json: true }, (error, data) => {
        if (error) {
            callback("Error in connection!!", undefined)
        } else if (data.body.response_code === 1) {
            callback("Questions not found!!", undefined)
        } else {
            // console.log(data.body.results)
            callback(undefined, data.body.results)
        }
    })
})

module.exports = questionList
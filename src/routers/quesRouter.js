const express = require('express')
const router = new express.Router()
const question = require('../models/question')
const quesTion = require('../db/utils/questionApi')

//get questions by type
router.post('/question/list', async(req, res) => {
    const qData = quesTion(req.body, (error, data) => {
        try {
            res.status(200).send(data)
        } catch (error) {
            res.status(400).send(error)
        }
    })
})

module.exports = router
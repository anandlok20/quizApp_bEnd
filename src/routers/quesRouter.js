const express = require('express')
const router = new express.Router()
const question = require('../models/question')

//create question
router.post('/question', async(req, res) => {
    const ques = new question(req.body)
    try {
        // console.log(ques)
        const quesN = await ques.save()
            // console.log(quesN)
        res.status(201).send(quesN)
    } catch (error) {
        res.status(400).send(error)
    }
})


//get questions by type
router.post('/question/list', async(req, res) => {
    const quesType = req.body.quesType
        // console.log(req.body.quesType)
    const quseList = await question.find({ quesType })
        // console.log(quseList)
    res.status(200).send(quseList)
})


//update user
router.patch('/question/update', async(req, res) => {
    const updates = Object.keys(req.body.quesType)
    const allowedUpdates = ['ques', 'qOption', 'cOption', 'quesType']
    const validateUpdates = updates.every((updates) => allowedUpdates.includes(updates))
        // console.log(validateUpdates)
    if (!validateUpdates) {
        return res.status(400).send({ error: 'Invalid Update' })
    }
    try {
        updates.forEach(update => req.question[update] = req.body[update])
        await req.question.save()

        res.status(200).send(req.question)
    } catch (error) {
        res.status(400).send({ error: "error in update" })
    }
})



module.exports = router
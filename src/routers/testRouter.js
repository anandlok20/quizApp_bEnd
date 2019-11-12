const express = require('express')
const router = new express.Router()
const Test = require('../models/testData')
const User = require('../models/user')
const Ques = require('../models/question')
const interceptor = require('../middelware/interceptor')

//create test
router.post('/test', async(req, res) => {
    // console.log(req.body.userId)
    const testU = req.body
    const email = req.body.userId
    const user = await User.find({ email })
        // const userT = await Test.find({ userId: email })
    console.log("user", user)
        // if (user) {
        //     res.status(400).send({ error: "duplicate user found in test db!!" })
        // }
    if (user === undefined) {
        res.status(400).send({ error: "duplicate user found in user db!!" })
    }
    const test = new Test(testU)
    try {
        const testN = await test.save()
        res.status(201).send(testN)
    } catch (error) {
        res.status(400).send(error)
    }
})

//update user
router.patch('/test/update', interceptor, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['userId', 'quesType', 'score']
    const validateUpdates = updates.every((updates) => allowedUpdates.includes(updates))
    if (!validateUpdates) {
        return res.status(400).send({ error: 'Invalid Update' })
    }
    try {
        const userId = req.users.email
        const test = await Test.find({ userId })
        if (!test) {
            res.status(400).send({ error: "user email not found" })
        }
        test[0].score = req.body.score
        await test[0].save()
        res.status(200).send(test)
    } catch (error) {
        res.status(400).send({ error: "error in updating test marks" })
    }
})

module.exports = router
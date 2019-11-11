const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const interceptor = require('../middelware/interceptor')

//create user
router.post('/user', async(req, res) => {
    const user = new User(req.body)
    try {
        const userN = await user.save()
            // console.log(userN)
        const t = await user.getAuthToken()
            // console.log("t  ---- ", t)
        res.status(201).send(userN)
    } catch (error) {
        res.status(400).send(error)
    }
})

//get users profile
router.get('/user/me', interceptor, async(req, res) => {
    res.status(200).send(req.users)
})


//update user
router.patch('/update/me', interceptor, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'role', 'age']
    const validateUpdates = updates.every((updates) => allowedUpdates.includes(updates))
        // console.log(validateUpdates)
    if (!validateUpdates) {
        return res.status(400).send({ error: 'Invalid Update' })
    }
    try {
        updates.forEach(update => req.users[update] = req.body[update])
        await req.users.save()

        res.status(200).send(req.users)
    } catch (error) {
        res.status(400).send(error)
    }
})

//delete user
router.delete('/delete/me', interceptor, async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.users.id)
        if (!user) {
            res.status(400).send({ error: 'user not found' })
        }
        res.status(200).send({ message: 'user deleted!!' })
    } catch (error) {
        res.status(400).send({ error: 'error in deleting' })
    }
})

//login 
router.post('/user/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if (!user) {
            return res.status(400).send({ error: "user not found!!" })
        }
        const token = await user.getAuthToken()
        res.status(200).send({ user, token })
    } catch (error) {
        res.status(400).send({ error: 'invalid login' })
    }
});

//logout from current login
router.post('/user/logout', interceptor, async(req, res) => {
    try {
        req.users.token = ''
        await req.users.save()
        res.status(200).send({ message: " Logged out " + req.users.name })
    } catch (error) {
        res.status(400).send({ error: 'logout failed' })
    }
})


module.exports = router
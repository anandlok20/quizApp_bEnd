const jwt = require('jsonwebtoken')
const user = require('../models/user')
const sign = 'quizmaster'

const interceptor = async(req, res, next) => {
    try {
        const token = req.header("Authorization").replace('Bearer ', '')
        const verifyData = jwt.verify(token, sign)
        const users = await user.findOne({ "_id": verifyData._id, "token": token })
        if (!users) {
            return res.status(401).send({ error: 'auth failed' })
        }
        req.token = token
        req.users = users
        next()
    } catch (error) {
        return res.status(401).send({ error: 'auth failed' })
    }
}

module.exports = interceptor
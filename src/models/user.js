const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sign = 'quizmaster'

const uSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowerCase: true,
        valdate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email!!')
            }
        }
    },
    password: {
        type: String,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password dose not contain password')
            }
        }
    },
    role: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Invalid Age')
            }
        }
    },
    token: {
        type: String
    }
})



uSchema.pre('save', async function(next) {
    const userNew = this

    if (userNew.isModified('password')) {
        userNew.password = await bcrypt.hash(userNew.password, 8)
    }

    next()
})

uSchema.methods.getAuthToken = async function() {
    this.token = jwt.sign({ _id: this._id.toString() }, sign);
    await this.save();
    // console.log(this.token)
    // const token = this.token
    return this.token
}

uSchema.methods.toJSON = function() {
    const userN = this
    const userProfile = userN.toObject()
    delete userProfile.password
    delete userProfile.token
    return userProfile
}

uSchema.statics.findByCredentials = async(email, password) => {
    const userNew = await user.findOne({ email })
    if (!userNew) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, userNew.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return userNew
}

const user = mongoose.model('users', uSchema)

module.exports = user
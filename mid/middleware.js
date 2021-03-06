const Joi = require('joi')
const jwt = require('jsonwebtoken')

exports.valid = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(1).max(50).required(),
        password: Joi.string().min(1).max(50).required()
    })
    return schema.validate(data)
}

exports.viewAllUsersAuth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            res.end('User not registered')
        }
        const decoded = jwt.verify(token,'key')
        req.user = decoded
        next()
    }catch (err){
        console.log(err)
        res.end('User not registered')
    }
}


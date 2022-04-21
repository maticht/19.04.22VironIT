const User = require('./models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function generateToken(password){
    return jwt.sign({password}, 'key');
}

module.exports.reg = async(req, res) => {
    const {email,password} = req.body
    const checkMailMatch = await User.findOne({email})
    if(checkMailMatch){
        res.end('This user already exists, please enter a different email address')
    }
    const hashPas = bcrypt.hashSync(password,10);
    const user = new User({email, password: hashPas})
    await user.save()
    res.end('User was added')
}

module.exports.log = async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
        res.end('User is not found')
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if(!validPassword) {
        res.end('Wrong password')
    }
    const token = generateToken(user.password)
    return res.json({token})
}

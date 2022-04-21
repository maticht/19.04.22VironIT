const User = require('./models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function generateToken(password){
    return jwt.sign({password}, 'key');
}

module.exports.reg = async(req, res) => {
    const {email,password} = req.body
    const checkMailMatch = await User.findOne({email})
    if(checkMailMatch){res.end('This user already exists, please enter a different email address')}
    const hashPas = bcrypt.hashSync(password,10);
    const user = new User({email, password: hashPas})
    await user.save()
    res.end('User was added')
}

module.exports.log = async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){res.end('User is not found')}
    const validPassword = bcrypt.compareSync(password, user.password)
    if(!validPassword) {res.end('Wrong password')}
    const token = generateToken(user.password)
    return res.json({token})
}
module.exports.getAllUsers = async(req,res) => {
    const users = await User.find()
    res.json(users)
}
module.exports.getUsersByEmail = async(req,res) => {
    const user = await User.find({email: req.params.email})
    res.json(user)
}
module.exports.deleteUsersByEmail = async(req,res) => {
    await User.deleteOne({email: req.params.email})
    res.end(`User with id ${req.params.email} has been deleted`)
}
module.exports.overwriteUsersByEmail = async(req,res) => {
    await User.updateOne({email: req.params.email},
        {$set: req.body} )
    res.end('Users has been overwritten')
}
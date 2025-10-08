const jwt = require('jsonwebtoken')
const User = require('../Models/User')
const bcrypt = require('bcrypt')


// Registering a new user as a customer
const register = async (req, res) => {
    try{
        const { name, email, password, role } = req.body;

        // Check if email already exsist
        let user = await User.findOne({email})
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exsists'
            })
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // Saves new user in DB
        user = await User({name, email, password:hashedPassword, role }).save()

        res.status(201).json({
            success: true,
            message: user
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


// Login functionality
const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Password is wrong'
            })
        }

        const token = jwt.sign({id: user._id, role: user.role}, "anewsecret", {expiresIn: '2h'})

        return res.status(200).json({
            token,
            role : user.role
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



// Protecte route example
const prof = async (req, res) => {
    try{
        const id = req.user.id 
        return res.status(200).json({
            success: true,
            user: await User.findById(id).select('-password -role')
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message: err.message
        })
    }
}


module.exports = { register, login, prof }
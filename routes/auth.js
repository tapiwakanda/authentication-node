const router = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../model/User')
const {registrationValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')

router.post('/register', async(req, res) => {

    //validate before submitting
    const { error } = registrationValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    // Check if email already exists
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('Email already exists') 

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (error) {
        res.status(400).send(err)
    } 
})

router.post('/login', async(req, res) => {
    //validate data before user logs in
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //checking if email exists
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send('Email  is wrong')
    //check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('password is wrong')

    //Create and assign token

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)


})

module.exports = router
const router = require('express').Router()
const User = require('../model/User')
const {registrationValidation} = require('../validation')

router.post('/register', async(req, res) => {

    //validate before submitting
    const { error } = registrationValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    // Check if email already exists
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('Email already exists') 
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password 
    })
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (error) {
        res.status(400).send(err)
    } 
})

router.post('/login')

module.exports = router
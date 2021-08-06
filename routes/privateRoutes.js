const jwt = require('jsonwebtoken')

// function for verifying if a user is logged in. helps in making routes private to those logged in.
module.exports = function (req, res, next){
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access Denied!')

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).send('Invalid token!')
    }
}
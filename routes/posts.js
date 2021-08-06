const router = require('express').Router()
const verify = require('./privateRoutes')


// an example of a private route
router.get('/', verify, (req,res) => {
    res.json({
        posts: {
            title: 'Maiden Post',
            description: 'Post to be accessed as a private route.'
        }
    })
})


module.exports = router
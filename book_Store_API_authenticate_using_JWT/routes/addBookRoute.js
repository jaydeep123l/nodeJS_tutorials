const express = require('express')
const router = express.Router();

router.get('/',(req,res,next) => {
    console.log(`in the addBook route of the project...`)
    res.send({status : 200 , message: 'in the addBook route, of the project...'})
})

module.exports = router;
var express = require('express')
var router = express.Router();

router.get('/',(req,res,next) => {
    res.send(`Response returned from the root route, of Index Page..`)
})


module.exports = router;
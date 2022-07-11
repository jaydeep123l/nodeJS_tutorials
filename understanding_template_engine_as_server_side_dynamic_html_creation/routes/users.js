var express = require('express')
var router = express.Router();

router.get('/',(req,res,next) => {
    res.send(`Response returned from the root route, of users..`)
})

router.get('/user',(req,res,next)=>{
    const user_object = {
        name : 'techie_guy',
        stack : 'MERN',
        email : 'techie_guy_021@gmail.com',
        hobbies : ['reading','travelling']
    }
    res.render('../views/usersPage',{user_object})
})

module.exports = router;
const express = require('express')
const router = express.Router();

console.log('inside get book routes')

router.get('/all',(req,res,next) => {
    console.log('in get all book')
    console.log(req.db_obj)
    res.send('gettin all books')
})


router.get('/:id',(req,res,next) => {
    console.log(`in get specific book with id ${req.params.id}`)
    res.send({status : 200 , message: 'getting a specific book...'})
})



module.exports = router;
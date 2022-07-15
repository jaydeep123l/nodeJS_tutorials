const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const index = require(`../index`)

console.log('inside get book routes')
// console.log(db_connection_obj)



router.get('/all', (req, res, next) => {
    console.log('in get all book')
    let token = req.headers.authorization
    let db_obj = req.db_obj
    console.log(req.headers.authorization)
    if (token) {
        try {
            const decrypted_login_credentials = jwt.verify(token.split(' ')[1], process.env.jwt_secret_key)

            console.log(`token verified..`)
            db_obj.collection('book_table').find({}).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                return res.send({ status: 200, bookArray: result })
            });
        } catch (error) {
            console.log(`handled by catch with ${error}`)
            return res.send({ status: 401, message: 'JsonWebTokenError: invalid token' })
        }

    } else {
        return res.send({ status: 409, message: 'token required' })
    }

})


router.get('/:id', (req, res, next) => {
    console.log(`in get specific book with id ${req.params.id}`)
    let token = req.headers.authorization
    let db_obj = req.db_obj
    let body = req.body
    console.log(req.headers.authorization)
    if (token) {
        try {
            const decrypted_login_credentials = jwt.verify(token.split(' ')[1], process.env.jwt_secret_key)

            console.log(`token verified..`)
            db_obj.collection('book_table').find({'_id':`${req.params.id}`}).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                return res.send({ status: 200, bookArray: result })
            });
        } catch (error) {
            console.log(`handled by catch with ${error}`)
            return res.send({ status: 401, message: 'JsonWebTokenError: invalid token' })
        }

    } else {
        return res.send({ status: 409, message: 'token required' })
    }
})



module.exports = router;
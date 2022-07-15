const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')



router.get('/',(req,res,next) => {
    console.log(`in the addBook route of the project...`)
    let token = req.headers.authorization
    let db_obj = req.db_obj
    console.log(req.headers.authorization)
    if (token) {
        try { 
        console.log(db_connection_obj)

            const decrypted_login_credentials = jwt.verify(token.split(' ')[1], process.env.jwt_secret_key)

            console.log(`token verified..`)
            db_obj.collection('book_table').insertOne(req.body, function (err, result) {
                if (err) throw err;
                console.log("1 document inserted");
                return res.send({ status: 200, message: "1 document inserted" })
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
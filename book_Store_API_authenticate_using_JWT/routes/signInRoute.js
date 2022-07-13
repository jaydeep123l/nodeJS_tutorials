const express = require('express')
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken')

router.post('/', (req, res, next) => {
    console.log(`in the signin route of the project...`)
    // console.log(req.headers.authorization)
    // let buff = new Buffer(req.headers.authorization.slice(0, -1),'base64');
    // console.log(buff.toString('ascii'))
    let user_object = req.body
    let db_obj = req.db_obj
    let encrypted_password = crypto.createHmac('sha256', process.env.password_encryption_secret_key)
                                    .update(req.body.password)
                                    .digest('hex')
    db_obj.collection('user_info').find({ 'mail_id': user_object.mail_id, 'password': encrypted_password }).toArray((err, result) => {
        if (result.length > 0) {
            let token_key = jwt.sign(user_object, process.env.jwt_secret_key)
            console.log(`user exist in the system...`)
            return res.send({ status: 200, message: 'login credentials authenticated' , token : token_key })
        } else {
            return res.send({ status: 409, message: 'invalid credentials' })
        }
    })
})

module.exports = router;
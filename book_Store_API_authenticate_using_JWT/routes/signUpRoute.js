const express = require('express')
const router = express.Router();
const crypto = require('crypto');



router.post('/', (req, res, next) => {
    console.log(`in the signup route of the project...`)
    let user_object = req.body
    let db_obj = req.db_obj
    db_obj.collection('user_info').find({ 'mail_id': user_object.mail_id }).toArray((err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            //encrypting_password _using_hashing..
            let hash = crypto.createHmac('sha256', process.env.password_encryption_secret_key)
                   .update(user_object.password)
                   .digest('hex');
            user_object.password = hash
            console.log(user_object)
            db_obj.collection('user_info').insertOne(user_object, (err, result) => {
                if (err) throw err;
                console.log("1 document inserted");
                return res.send({ status: 200, message: 'user added..' })
            })

        } else {
            return res.send({ status: 409, message: 'mail_id already exists' })
        }
    })

})

module.exports = router;
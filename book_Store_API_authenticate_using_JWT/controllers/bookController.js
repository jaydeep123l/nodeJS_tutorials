var Book = require('../models/book');

let getAllBooks = (req, res) => {
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

}

module.exports = {getAllBooks}
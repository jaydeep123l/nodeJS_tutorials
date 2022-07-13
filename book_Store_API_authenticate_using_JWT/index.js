const express = require('express')
const jwt = require('jsonwebtoken')
const dotenvModule = require('dotenv')
const bodyParser = require('body-parser');

const rootRoute = require('./routes/rootRoute')
const signUpRoute = require('./routes/signUpRoute')
const signInRoute = require('./routes/signInRoute')
const getBookRoute = require('./routes/getBookRoute')
const addBookRoute = require('./routes/addBookRoute')
const updateBookRoute = require('./routes/updateBookRoute')
const deleteBookRoute = require('./routes/deleteBookRoute')
const db_operation = require('./database_query')

dotenvModule.config()

const app = express()


app.use(bodyParser.json());


var db_connection_obj;
// Mongo DB database conenction ============
// If db already, exist then connect it else will create a new db with the specific name
let db_connection = async () => {
    let url = `mongodb://${process.env.mongo_db_server_ip}:${process.env.mongo_db_service_on_port}`;
    let db_name = "book_Store_DB"
    let connection_obj = await db_operation.create_mongodb_server_connection(url)
        .then((result) => {
            // console.log(result)
            let db_obj = db_operation.create_db_if_not_exists(result, db_name)
            db_operation.create_collection_if_not_exist(db_obj,'user_info')
                .then((result) => {
                    console.log(`collection created`)
                })
                .catch((error) => {
                    console.log(error)
                })
            db_operation.create_collection_if_not_exist(db_obj,'book_table')
                .then((result) => {
                    console.log(`collection created`)
                })
                .catch((error) => {
                    console.log(error)
                })
            db_connection_obj = db_obj;

        })
        .catch((error) => {
            console.log(`error occured while connection..`)
            console.log(error)
        })

}

db_connection()



//middleware to append the db_connection object into the request object
let insert_DB_Connection_Obj_Into_Req = (req, res, next) => {
    console.log(`middleware called`)
    req.db_obj = db_connection_obj
    next()
}



//mapping routes, to the specific routes file..========= 
app.use('/', rootRoute)
app.use('/signUp', insert_DB_Connection_Obj_Into_Req, signUpRoute)
app.use('/signIn', insert_DB_Connection_Obj_Into_Req, signInRoute)
app.use('/getBook', insert_DB_Connection_Obj_Into_Req, getBookRoute)
app.use('/addBook', insert_DB_Connection_Obj_Into_Req, addBookRoute)
app.use('/updateBook', insert_DB_Connection_Obj_Into_Req, updateBookRoute)
app.use('/deleteBook', insert_DB_Connection_Obj_Into_Req, deleteBookRoute)

app.listen(5000, (err) => {
    if (err)
        throw err
    console.log(`server listening over port 5000`)
})
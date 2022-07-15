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




// Mongo DB database conenction ============
// If db already, exist then connect it else will create a new db with the specific name
let db_connection = async () => {
    try {
        let url = `mongodb://${process.env.mongo_db_server_ip}:${process.env.mongo_db_service_on_port}`;
        let db_name = "book_Store_DB"
        let connection_obj = await db_operation.create_mongodb_server_connection(url)
        let db_obj = db_operation.create_db_if_not_exists(connection_obj, db_name)
        //used then / catch because as, the returned response from promise is unknowing, so if in case it gets rejected then these will block further code execution and these will cause issue in further cases.... so handled each promise individually..
        await db_operation.create_collection_if_not_exist(db_obj, 'user_info')
            .then((result) => { console.log(`collection user_info created`) })
            .catch((err) => { console.error(err) })
        await db_operation.create_collection_if_not_exist(db_obj, 'book_table')
            .then((result) => { console.log(`collection book_table created`) })
            .catch((err) => { console.error(err) })

        // global.bind(db_obj)
        // console.log(db_obj)
        var db_connection_obj = db_obj
        
    } catch (error) {
        console.log(`error occured in the db connection as...`)
        console.log(error)
    }
}



console.log(`global..`)
console.log(global  ) 

const setGlobal = (v)=>{
    const abc = v
}

db_connection()

//middleware to append the db_connection object into the request object
// let insert_DB_Connection_Obj_Into_Req = (req, res, next) => {
//     console.log(`middleware called`)
//     req.db_obj = db_connection_obj
//     next()
// }



//mapping routes, to the specific routes file..========= 
app.use('/', rootRoute)
app.use('/api/v1/book',  book.routes.js)
app.use('/api/v1/user', user.routes.js)

app.listen(5000, (err) => {
    if (err)
        throw err
    console.log(`server listening over port 5000`)
})
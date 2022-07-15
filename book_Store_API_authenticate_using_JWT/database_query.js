var MongoClient = require('mongodb').MongoClient;



let create_mongodb_server_connection = async (url) => {
    console.log(`inside create db connection...`)
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, connection_obj) => {
            if (err) {
                return reject(err)
            };
            console.log("Connected to mongoDB server..!");
            // connection_obj.close(); 
            return resolve(connection_obj)
        });
    })

}

let create_db_if_not_exists = (con_obj, db_name) => {
    var db_obj = con_obj.db(db_name)
    // console.log(db_obj)
    console.log(`connected to database ${db_name}`)
    return db_obj
}

let create_collection_if_not_exist = async (db_obj, collection_name) => {
    return new Promise((resolve, reject) => {
        db_obj.createCollection(collection_name)
            .then((result) => {
                console.log(`collection created`)
                return resolve(result)
            })
            .catch((error) => {
                if (error.code == 48) {
                    return reject (`error occured while creating collecion ${collection_name} as it already exist`)
                } else {
                    console.log(error)
                    return reject (error)
                }

            })
    })
}


module.exports = { create_mongodb_server_connection, create_db_if_not_exists, create_collection_if_not_exist }
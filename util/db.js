
//package of mongodb 
const { MongoClient } =require('mongodb')

let dbConnection 

let uri ="mongodb+srv://Jakcin:test1234@cluster0.lknjkpr.mongodb.net/?retryWrites=true&w=majority"

module.exports= {
    //establish connection to db(local machine:"mongodb://localhost:27017/bookstore")
    connectToDb: (cb) => {
        MongoClient.connect(uri)
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => {
        return dbConnection
    }
    //return connction to the db

}
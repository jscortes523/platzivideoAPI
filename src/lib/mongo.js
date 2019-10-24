const { MongoClient, ObjectId } = require('mongodb')
const { config } = require('../config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPaswword)
const HOST = encodeURIComponent(config.dbHost)
const DB_NAME = config.dbName

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/test?retryWrites=true&w=majority`

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: false })
        this.dbName = DB_NAME
        console.log(this.dbName)
    }

    connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err) {
                        reject(err)
                    }

                    console.log('Hey We are connected now!!')
                    resolve(this.client.db(this.dbName))
                })
            })
        }

        return MongoLib.connection
    }


    getAll(collection, query) {
        return this.connect().then(db => {
            return db.collection(collection).find(query).toArray()
        })
    }

    get(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({ _id: ObjectId(id) })
        })
    }

    create(collection, data) {
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data)
        }).then(result => result.insertedId)
    }

    update(collection, id, data) {
        return this.connect().then(db => {
            return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
        }).then(result => result.upsertedId || id)
    }

    delete(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).deleteOne({ _id: ObjectId(id) })
        }).then(() => id)
    }
}

// eslint-disable-next-line no-undef
module.exports = MongoLib
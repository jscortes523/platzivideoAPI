require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 9090,
    cors:process.env.CORS,
    port:process.env.PORT,
    dbUser:process.env.DB_USER,
    dbPaswword:process.env.DB_PASSWORD,
    dbHost:process.env.DB_HOST,
    dbName:process.env.DB_NAME,
}

module.exports = {config}
const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "@1siddharth",
    host: "localhost",
    port: 5432,
    database: "webapi"
})

module.exports= pool;
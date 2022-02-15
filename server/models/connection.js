const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    password : "Badutsulap1",
    database : "binar_fsw",
    host : "localhost",
    port : 5432
})

module.exports = pool
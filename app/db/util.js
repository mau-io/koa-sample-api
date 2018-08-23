const { Pool, Client } = require('pg')
const config = require('./../../config.js');
// =========================================================
// This is the connection pool the rest of our db namespace
// should import and use
const pool = new Pool(config.DATABASE);

module.exports = {pool}
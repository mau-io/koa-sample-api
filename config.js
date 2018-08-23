module.exports = {
  SERVER: {
    port: process.env.NODE_PORT || 3232
  },
  DATABASE: {
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT || 5432,
    database: process.env.DB_NAME,
    user:     process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    // maximum number of clients the pool should contain
    // max: Math.floor( process.env.DB_MAX / (process.env.NODE_INSTANCES || 1) ), 
    max: process.env.DB_MAX, 
    // number of milliseconds a client must sit idle in the pool and not be checked out
    // before it is disconnected from the backend and discarded
    // default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients
    idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT,
    // number of milliseconds to wait before timing out when connecting a new client
    // by default this is 0 which means no timeout
    connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT,
  }

};
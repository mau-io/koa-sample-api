const {pool} = require('../db/util');

module.exports = {

	//////////////////////////////////////////////
	// DB methods
  //////////////////////////////////////////////
  
  // Ejecuta la query como una transaccion
	pgTransaction: async (query, values) => {
 
		try {
			const result = await transaction(query, values, pool);
			return JSON.parse(result.rows[0].result);
		} catch (err) {
			throw err;
		}
  },

  // Ejecuta la query de manera normal
  pgQuery: async (query, values) => {
    
		try {
			const result = await simpleQuery(query, values, pool);
			return JSON.parse(result.rows[0].result);
		} catch (err) {
			throw err;
		}
  }

};

//////////////////////////////////////////////
// query with transaction 
//////////////////////////////////////////////
async function transaction(query, values = [], db){

  const client = await db.connect();
  //console.log(db.totalCount);
  //console.log(db.waitingCount);
  let res;
  
  try {

          await client.query('BEGIN');
    res = await client.query(query, values);
          await client.query('COMMIT');

   } catch (err) {
    
    await client.query('ROLLBACK');
    throw err;

  } finally {
    client.release();
  }

  return res;
}

//////////////////////////////////////////////
// query function without transaction
//////////////////////////////////////////////
async function simpleQuery(query, values = [], db){

  const client = await db.connect();
  let res;

  try {  
    res = await client.query(query, values);

  } catch (err) {
    throw err;

  } finally {
    client.release();
  }
  
  return res;
}
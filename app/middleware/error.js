module.exports = async (ctx, next) => {
	
	try {
		await next();
	} catch (err) {

		// will only respond with JSON
		let code = err.code || err.status || 500;

		if(err.code == "P0001"){
			code = 403;
		}

		ctx.status = code;
	
	  ctx.body = {
			code  			: code,
			message     : err.message,
			data        : {
				code: 	err.code,
				where: 	err.where
			}
		}

	}

};


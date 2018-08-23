const db 				= require('../../db');
const endpoints = require('../../routes/endpoints').v1.article;
const result 		= require('../../libraries/result');

module.exports =  {

	postArticle: async (ctx, next) => {

		ctx.verifyParams(endpoints.postArticle.verifyParams);

		try {
			let params = ctx.request.body;

			let values = [
				params.title, 
				params.body, 
			];

			const query = 'INSERT INTO articles(title, body) VALUES($1, $2) AS result;';
			let data = await db.pgQuery(query, values);

			ctx.status = 201; 
			ctx.body = result(data, ctx.status);

		} catch(err) {
			ctx.throw(err);
		}

  },
  
  getArticle: async (ctx, next) => {

		ctx.verifyParams(endpoints.getArticle.verifyParams);

		try {
      let params = ctx.query;
		
			ctx.body = result(params);

		} catch(err) {
			ctx.throw(err);
		}

	},

}


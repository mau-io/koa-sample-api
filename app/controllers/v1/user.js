const db 				= require('../../db');
const endpoints = require('../../routes/endpoints').v1.user;
const result		= require('../../libraries/result');

module.exports =  {

	postUser: async (ctx, next) => {

		ctx.verifyParams(endpoints.postUser.verifyParams);

		try {
      let params = ctx.request.body;
		
			ctx.body = result(params);

		} catch(err) {
			ctx.throw(err);
		}

  },
  
  getUser: async (ctx, next) => {

		ctx.verifyParams(endpoints.getUser.verifyParams);
		ctx.conditionalParams("id", "username");

		try {
      let params = ctx.query;
		
			ctx.body = result(params);

		} catch(err) {
			ctx.throw(err);
		}

  },

  updateUser: async (ctx, next) => {

		ctx.verifyParams(endpoints.updateUser.verifyParams);

		try {
      let params = ctx.request.body;
		
			ctx.body = result(params);

		} catch(err) {
			ctx.throw(err);
		}

  },

  deleteUser: async (ctx, next) => {

		ctx.verifyParams(endpoints.deleteUser.verifyParams);

		try {
      let params = ctx.request.body;
		
			ctx.body = result(params);

		} catch(err) {
			ctx.throw(err);
		}

  },
  
  
}


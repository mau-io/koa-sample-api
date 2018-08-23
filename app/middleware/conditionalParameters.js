'use strict';


module.exports = function (app) {

  app.context.conditionalParams = function(...params) {
    
    // Obtiene el obejto que se le envio dependiendo si es GET o POST
    let obj = ['GET', 'HEAD'].includes(this.method.toUpperCase())
      ? JSON.parse(JSON.stringify(this.request.query))
      : this.request.body;

    let existParams = false;

    // Busca si existe la key value en el objeto enviado
    params.forEach(param => {
      if(obj.hasOwnProperty(param)){
        existParams = true;
      }  
    });

    // Si existe al menos un paramtro en el objeto enviado, interrumpe la ejecucion
    if(existParams){
      return;
    }

    this.throw(422, 'Validation Failed', {
      code: 'CONDITIONAL_PARAM',
      error: params
    });

  };
  
  return async function conditionalParams(ctx, next) {
    
    try {
      await next();
    } catch(err){
      
      if (err.code === 'CONDITIONAL_PARAM') {
        ctx.status = 422;
        ctx.body = { 
          code        : 422,
          message     : err.message,
          data        : {
            code: err.code,
            error: err.error,
          }
        }
        return;
      }

      throw err;
    }
  };
};
const Router     = require('koa-router');
const endpoints  = require('./endpoints');

//Instantiate the router
const router = new Router(); 

/*--------------------------------------------------------------------- */
/* Usando el objeto dentro de edpoints.js construye el arbol de rutas */
// Path = /Version -> /Nombre del controlador -> /Nombre del metodo 
/*--------------------------------------------------------------------- */
const send = require('koa-send');

// itera para sacar la version
for (let version in endpoints) {
 // itera para sacar los controladores dentro de cada version
  for (let controller in endpoints[version]) {

    try {

      let file = require(`../controllers/${version}/${controller}`);
      
      // itera para sacar los metodos dentro de cada controlador 
      for (let method in endpoints[version][controller]) {

        let verb = endpoints[version][controller][method].verb.toLowerCase();
        //let path = `/${version}/${controller}/${method}`;
        let path = `/${version}/${controller}/`;

        //construye el path y le pasa su methodo correspondiente
        router[verb](path, file[method]);
      }
    
    } catch (e) {
      console.log("\x1b[31m%s: \x1b[0m" + e, "--- Endpoint ---");
    }

  }
}

/*--------------------------------------------------------------------- */
/* Rutas estaticas */
/*--------------------------------------------------------------------- */

if(process.env.NODE_ENV != "production"){
  router.get('/explorer/data', async (ctx, next) => ctx.body = endpoints);
  router.get('/explorer', async (ctx, next) => {
    await send(ctx, "index.html", { root: __dirname + './../views' });
  });
}

router.get('/',   async (ctx, next) => ctx.throw(403));
router.post('/',  async (ctx, next) => ctx.throw(403));

module.exports = router;


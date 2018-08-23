const http  = require('http'),
      Koa   = require('koa'),
      {routes, allowedMethods}  = require('./app/routes'),
      app   = new Koa();

const cors  = require('koa2-cors'),
  logger  = require('koa-pino-logger'),
  koaBody = require('koa-body'),
  serve   = require('koa-static');

const config  = require('./config.js'),
  conditional = require('./app/middleware/conditionalParameters'),
  parameter   = require('./app/middleware/parameter'),
  err         = require('./app/middleware/error');

// //////////////////////////////////////////////////////////
// Middlewares
// //////////////////////////////////////////////////////////  

app.use(err);
app.use(parameter(app));
app.use(conditional(app));

// //////////////////////////////////////////////////////////
// Modules
// //////////////////////////////////////////////////////////  

app.use(cors());
app.use(logger({
  level:"error",
  prettyPrint: true
}))

app.use(koaBody({
  jsonLimit: "20mb",
  formLimit: "20mb",
  textLimit: "20mb",
}));

app.use(serve('./public'));

// //////////////////////////////////////////////////////////
// Routes
// //////////////////////////////////////////////////////////

app.use(routes()); // Use the routes defined using the ./app/routes
app.use(allowedMethods());

const server = http.createServer(app.callback()).listen(config.SERVER.port,  () => {

console.log(`
\x1b[34m================================================================
\x1b[34m API CORE  (ﾟｰﾟ)/
\x1b[34m================================================================`);

  console.log('\x1b[36m%s: \x1b[0m' + process.env.NODE_ENV, "NODE_ENV");
  console.log('\x1b[36m%s: \x1b[0m' + config.SERVER.port, "Listening at port");
  console.log("\x1b[34m================================================================");

});
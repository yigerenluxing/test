const Koa = require('koa');
const routesDefs = require('require-all')({ dirname: `${__dirname}/router` });
const Router = require('koa-router');
var path = require('path');
let env = process.env.NODE_ENV || 'production'

// process.env.NODE_ENV = 'production'

const config = require('config')


const app = new Koa();
// console.log(process.env);

// console.log(process.env,'NODE_ENV');
// // 载入配置文件
// var file = path.resolve(__dirname+'/config', env);
// env = env.toLowerCase();
// console.log(env);

// var config = module.exports = require(file);
// console.log(config.mongodb,'666');
// console.log(routesDefs,888);
Object.keys(routesDefs).forEach(route => {
    // console.log(route,77);
    const routeDef = routesDefs[route];
   
    const router = new Router({ prefix: `/${route}` });
    // console.log(router.routes(), 66);
    routeDef(router);
    app.use(router.routes());
})
// console.log(config, 'config');

app.listen(3001);
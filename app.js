const Koa = require('koa');
const routesDefs = require('require-all')({ dirname: `${__dirname}/router` });
const Router = require('koa-router');
const path = require('path');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const config = require('config')

let env = process.env.NODE_ENV || 'dev'


const app = new Koa();

// console.log(app.context,'111');
app.use(bodyParser())//支持Josn,form,text类型

app.keys = ['some secret hurr']; //cookie签名
const CONFIG = {
    key: 'koa:sess',   //cookie key (default is koa:sess)
    maxAge: 600000,  // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
};


app.use(session(CONFIG, app));
Object.keys(routesDefs).forEach(route => {
    // console.log(route,77);
    const routeDef = routesDefs[route];

    const router = new Router({ prefix: `/${route}` });
    // console.log(router,'router');
    routeDef(router);
    app.use(router.routes());
    // console.log(router.routes(),'11');
})
// console.log(config, 'config');

app.listen(3001);

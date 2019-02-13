

const jwt = require('jsonwebtoken');

function getToken(Payload, cert, options) {
    let token = jwt.sign(Payload, cert, options)
    return token;
}

const certification = (ctx, next) => {//登录认证中间件
    let cert = 'asd'
    let { authorization } =  ctx.request.header;
    let decoded
    try {
        decoded = jwt.verify(authorization, cert);
        console.log(decoded, '99');
        ctx.userInfo = {}
        ctx.userInfo.name = decoded.name 
        next()
    } catch (err) {
        console.log(err, 'err');
        return ctx.body = {
            code: 400,
            message: "请登录"
        }
    }
}

module.exports = router => {
    router.post('/login', async (ctx) => { //session 认证
        const { userId, password } = ctx.request.body;

        console.log(ctx.request.body);
        console.log(ctx.session, '888')
        console.log(ctx.cookies.get('koa:sess'), '9999')
        // ctx.cookies.set('test', 'hello', {httpOnly: false});
        if (!((userId == 'admin' && password == "123456") || (userId == "root" && password == "123"))) {
            return ctx.body = {
                code: 1001,
                message: "账号或密码错误"
            }
        }
        ctx.session.username = userId;
        // let cookies = ctx.cookies.get('test');
        // console.log(ctx.session.username,'111');
        ctx.body = {
            code: 0,
            message: '登录成功'
        }
    })

    router.post('/logintoken', async (ctx) => { //token 认证
        const { userId, password } = ctx.request.body;

        // ctx.cookies.set('test', 'hello', {httpOnly: false});
        if (!((userId == 'admin' && password == "123456") || (userId == "root" && password == "123"))) {
            return ctx.body = {
                code: 1001,
                message: "账号或密码错误"
            }
        }
        let options, Payload, cert
        Payload = {
            name: userId
        }
        options = {
            algorithm: 'HS256',
            expiresIn: 60 * 5,
            issuer: 'root',

        }
        cert = 'asd'
        let token = getToken(Payload, cert, options);
        ctx.body = {
            code: 0,
            data: token,
            message: '登录成功'
        }
    })

    router.post('/certification', certification,async (ctx) => { //session 认证
        // let cookies = ctx.cookies.get('test');
        // console.log(ctx.session.username,'111');
        console.log(ctx.userInfo,'77777');
        ctx.body = {
            code: 0,
            message: '登录成功'
        }
    })
}


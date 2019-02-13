

const nodemailer = require('nodemailer');
const MongoOplog = require('mongo-oplog');
const request = require('request');
var cheerio = require('cheerio');
var superagent = require('superagent');
const fs = require('fs');
const path = require('path');
const xlsx = require('node-xlsx');


module.exports = router => {
    // console.log(asd,'---------------')
    router.get('/list', async (ctx) => {
        console.log(ctx.session,'session');
        console.log(ctx.sessionId,'sessionid');

        // return ctx.response.status('200 success');
        ctx.body = {code:'200',meagess:'ok'}
    });
    // console.log(asd,'asd');
    router.get('/list1', async (ctx) => {
    //    let cookies = ctx.cookies.get('test');
    //    console.log(cookies);

        // return ctx.response.status('200 success');
        ctx.body = {code:'200',meagess:'ok'}

        
    });
}
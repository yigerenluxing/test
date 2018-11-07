

const nodemailer = require('nodemailer');
const MongoOplog = require('mongo-oplog');
const request = require('request');
var cheerio = require('cheerio');
var superagent = require('superagent');
const fs = require('fs');
const path = require('path');
const xlsx = require('node-xlsx');


let url = 'xxxx';

var crypto = require('crypto');
    
function E_mail() {
    let transporter = nodemailer.createTransport({
        host: 'smtp.sina.com',
        secureConnection: true,
        service: "qq",
        auth: {
            user: "xxxx111",//发送者
            pass: 'xxxx'//授权码
        }
    });

    let mailOptions = {
        from: "xxx",//发送者
        to: "xxx",//接收者
        subject: "经济席位发生变动",//标题
        text: "经济席位发生变动",
        html: `<a href="http://www.baidu.com">经济席位发生变动</a>`
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            return;
        }

        console.log('发送成功');
    });
}


function pc() {
    try {
        superagent.get('xxx').end(function (err, sres) { 
            if (err) {
                // console.log(err)
                console.log('爬取失败');
                return err;
            }
            var $ = cheerio.load(sres.text);
            let asd = $('a.button-default').attr('href');
            console.log(asd);
        })
    } catch (err) {
        console.log(err)
    }

}

async function pullExecl() {
    try {
        console.log(url);
        var img_src = url; //获取excel的url
        var img_filename = 'mu.csv';
        let dataover = await fs.createWriteStream('./' + img_filename)
        request(img_src).pipe(dataover);
        dataover.on('close', () => {
            console.log('拉取成功')
        })
    } catch (err) {
        console.log(err, 99999)
    }
}

// pullExecl();

async function md5File() {
    const defpath = path.join(__dirname, '../');
    // const excel = xlsx.parse(defpath + 'mu.csv')
    let dataBuff = await fs.readFileSync(defpath + 'mu.csv');
    // let dataBuff = await fs.readFileSync(defpath + 'List_of_Current_SEHK_EP (2).CSV');
    var md5 = crypto.createHash('md5');
    md5.update(dataBuff);
    var sign = md5.digest('hex');
    console.log(sign,'sign');
}

async function md5cyFile() {
    const defpath = path.join(__dirname, '../');
    // const excel = xlsx.parse(defpath + 'mu.csv')
    // let dataBuff = await fs.readFileSync(defpath + 'mu.csv');
    let dataBuff = await fs.readFileSync(defpath + 'List_of_Current_SEHK_EP (2).CSV');
    var md5 = crypto.createHash('md5');
    md5.update(dataBuff);
    var sign = md5.digest('hex');
    console.log(sign,'sign');
}

md5File();
md5cyFile()

module.exports = asd => {
    // console.log(asd,'---------------')
    asd.get('/list', async (ctx) => {
        console.log(11111)


        // return ctx.response.status('200 success');
        // ctx.body = {a:'200'}
    });
    // console.log(asd,'asd');
}
var express = require('express');
var router = express.Router();
var request = require('request');
// https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index

const appId = 'wx7d3ec512a433852a';
const appSecret = 'f55f6e1b4902ea8426c9b61ea3156d93';
const TOKEN = 'quanrutt';

function checkSignature(params,token){
    //将token (自己设置的) 、timestamp(时间戳)、nonce(随机数)三个参数进行字典排序
    var key=[token,params.timestamp,params.nonce].sort().join('');
    //将上面三个字符串拼接成一个字符串再进行sha1加密
    var sha1=require('crypto').createHash('sha1');
    sha1.update(key);

    //将加密后的字符串与signature进行对比，若成功，返回echostr
    return sha1.digest('hex') ===params.signature;
}

router.get('/hello', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are welcome');
});

/* GET home page. */
router.get('/wx', function(req, res, next) {
    if (checkSignature(req.query,TOKEN)) {
        //验证成功
        res.send(req.query.echostr);
    } else {
        //验证失败
        res.send(false);
    }
});

router.get('/', function(req, res, next) {
        const code = req.query['code'];
        const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${appSecret}&code=${code}&grant_type=authorization_code`;

        request(url, function (error, response, body) {
            if(error){
                res.render('index', { title: 'Express', content:  error});
            }else{
                res.render('index', { title: 'Express', content:  body});
            }
        });

});

module.exports = router;

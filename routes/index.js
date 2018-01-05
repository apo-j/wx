var express = require('express');
var router = express.Router();

const appId = 'wx7d3ec512a433852a';
const appSecret = 'f55f6e1b4902ea8426c9b61ea3156d93';
const token = 'token';

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
    var token = "quanru";
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var echostr = req.query.echostr;
    var nonce = req.query.nonce;
    var oriArray = [nonce, timestamp, token];
    oriArray.sort();
    var original = oriArray.join('');
    var shaObj = new jsSHA(original, 'TEXT');
    var scyptoString = shaObj.getHash('SHA-1', 'HEX');
    if (signature == scyptoString) {
        //验证成功
        res.send(echostr);
    } else {
        //验证失败
        res.send(false);
    }
});

router.get('/', function(req, res, next) {
        const code = req.params['code'];
        const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${appSecret}&code=${code}&grant_type=authorization_code`;

        res.render('index', { title: 'Express' });
});

module.exports = router;

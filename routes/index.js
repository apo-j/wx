var express = require('express');
var router = express.Router();

const appId = 'wx7d3ec512a433852a';
const appSecret = 'f55f6e1b4902ea8426c9b61ea3156d93';

router.get('/hello', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are welcome');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  const code = req.params['code'];
  //const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${appSecret}&code=${code}&grant_type=authorization_code`;

  res.render('index', { title: 'Express' });
});

module.exports = router;

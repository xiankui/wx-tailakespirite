var https = require('https');

var appid = 'wx0329ec5ab7ba5ded';
var secret = 'a70ff41899fe9845338fb57cbf4f1801';
var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+ appid +'&secret='+ secret;

https.get(url, function (res) {
	res.setEncoding('utf8');
	var accesstoken = '';
	res.on('data', function (chunk) {
		accesstoken += chunk;
	});
	res.on('end', function () {
		res.send(accesstoken);
	});
}).on('error', function (e) {
	console.error(e);
});
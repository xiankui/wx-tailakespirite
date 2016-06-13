const https = require('https');

var wxUrl = 'https://api.weixin.qq.com';


// 获取access_token
var getAccessToken = function (option, callback) {
	var path = '/cgi-bin/token';
	
	var url = wxUrl + path + '?grant_type=client_credential&appid='+ option.appid +'&secret='+ option.secret;

	https.get(url, function (res) {
		res.setEncoding('utf8');
		var accesstoken = '';
		res.on('data', function (chunk) {
			accesstoken += chunk;
		});
		res.on('end', function () {
			callback(null, accesstoken);
		});
	}).on('error', function (e) {
		callback(e, 'getAccessToken error');
	});
};

// 获取微信服务器ip列表
var getCallBackIP = function (option, callback) {

	var path = '/cgi-bin/getcallbackip';
	var url = wxUrl + path + '?access_token=' + option.access_token;
	var data = '';

	https.get(url, function (res) {
		res.setEncoding('utf8');

		res.on('data', function (chunk) {
			data += chunk;
		});
		res.on('end', function () {
			callback(null, data);
		});
	}).on('error', function (err) {
		callback(err, 'getCallBackIP error');
	});
};

exports.getAccessToken = getAccessToken;
exports.getCallBackIP = getCallBackIP;
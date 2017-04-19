/**
 * token 072075049048050052116101097109
 */
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

var _a = function (s) {
	var arr = s.split('');
	var asc = arr.map(i => {
		c = i.charCodeAt().toString();
		if (c.length === 1) {
			return '00' + c;
		}
		if (c.length === 2) {
			return '0' + c;
		}

		return c;
	})

	return asc.join('')
}

var _d = function (s) {
	var i = 0,
			len = s.length,
			_s = '',
			d = [];
	for (i; i<len; i+=3) {
		_s = s.slice(i, i+3);
		d.push(String.fromCharCode(_s))
	}

	return d.join('')
}

exports.getAccessToken = getAccessToken;
exports.getCallBackIP = getCallBackIP;
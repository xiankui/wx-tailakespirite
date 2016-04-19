var express = require('express');
var app = express();

var xmlparser = require('express-xml-bodyparser');

var appid = 'wx0329ec5ab7ba5ded';
var secret = 'a70ff41899fe9845338fb57cbf4f1801';

var validateTokenFunc = require('./validateToken').validateToken;
var wxInterface = require('./weixinInterface');

app.get('/', function (req, res) {
  validateTokenFunc(req, res);
});

app.post('/', xmlparser({trim: false, explicitArray: false}), function (req, res) {
	console.log(req.body);
	var reqBody = req.body.xml;
	var msgType = reqBody.msgtype;
	var msg = reqBody.content;

	var data = '呵呵';

	if (msg == '你好') {
		data = '我好，你也好！';		
	} 

	var xml = '';
	xml += '<xml>';
	xml += '<ToUserName>oQAJ_wdJQrm_IuHXLVnr2RVVSNGY</ToUserName>';
	xml += '<FromUserName>gh_965ad0d8c4c4</FromUserName>';
	xml += '<CreateTime>12345678</CreateTime>';
	xml += '<MsgType>text</MsgType>';
	xml += '<Content>'+ data +'</Content>';
	xml += '</xml>';

	res.writeHead(200, {'Content-Type': 'application/xml'});
	res.end(xml);	
})

app.get('/getaccesstoken', function (req, res) {
	var option = {
		appid: appid,
		secret: secret
	};

	wxInterface.getAccessToken(option, function (err, access_token) {
		if (err) {
			console.error('getAccessToken error');
			return;
		}

		res.send(access_token);
	});
});

app.get('/getiplist', function (req, res) {

	var option = {
		appid: appid,
		secret: secret
	};

	wxInterface.getAccessToken(option, function (err, access_token) {
		if (err) {
			console.error('getAccessToken error');
			return;
		}

		wxInterface.getCallBackIP(access_token, function (err, iplist) {
			if (err) {
				console.log('getCallBackIP error');
				return;
			}

			res.send(iplist);
		})
	});

	
})

app.listen(80, '120.26.38.84');

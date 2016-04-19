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

var msgRobot = require('./msgRobot');
app.post('/', xmlparser({trim: false, explicitArray: false}), function (req, res) {
	console.log(req.body);
	var reqBody = req.body.xml;
	var username = reqBody.fromusername;
	var appname = reqBody.tousername;
	var msgType = reqBody.msgtype;
	var msg = reqBody.content;

	var data = msgRobot[msgType + 'Robot'](msg);
	console.log(data);
	var xml = '';
	xml += '<xml>';
	xml += '<ToUserName>'+ username +'</ToUserName>';
	xml += '<FromUserName>'+ appname +'</FromUserName>';
	xml += '<CreateTime>'+ Date.now() +'</CreateTime>';
	xml += '<MsgType>'+ msgType +'</MsgType>';
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
		console.log(access_token);

		wxInterface.getCallBackIP(access_token, function (err, iplist) {
			if (err) {
				console.log('getCallBackIP error');
				return;
			}

			res.send(iplist);
		})
	});
});

app.listen(80, '120.26.38.84');

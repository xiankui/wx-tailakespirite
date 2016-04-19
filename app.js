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

	var data = '';
	if (msgType == 'text') {
		data = msgRobot.textRobot(reqBody.content);
	} else if (msgType == 'image') {
		data = '哎呀妈呀，有图有真相啊';
	} else if (msgType == 'voice') {
		data = '大点声，我听不见';
	} else if (msgType == 'video') {
		data = '视频可不能乱发啊，费流量';
	} else if (msgType == 'shortvideo') {
		data = '小视频也费流量啊';
	} else if (msgType == 'location') {
		data = '小样，你在' + reqBody.label + '等着我';
	} else if (msgType == 'link') {
		data = '链接消息';
	} else {
		data = '天哪，这是神马，完全不懂啊';
	}

	
	var xml = '';
	xml += '<xml>';
	xml += '<ToUserName>'+ username +'</ToUserName>';
	xml += '<FromUserName>'+ appname +'</FromUserName>';
	xml += '<CreateTime>'+ Date.now() +'</CreateTime>';
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

var crypto = require('crypto');

var sha1 = function (str) {
	var md5sum = crypto.createHash('sha1');
	md5sum.update(str);
	str = md5sum.digest('hex');
	return str;
};

var validateToken = function (req, res) {
	var query = req.query;
	var echostr = query.echostr;
	var signature = query.signature;
	var timestamp = query.timestamp;
	var nonce = query.nonce;

	var ori_arr = [];
	ori_arr[0] = nonce;
	ori_arr[1] = timestamp;
	ori_arr[2] = 'nanhuaijin'; // token
	ori_arr.sort();

	var original = ori_arr[0] + ori_arr[1] + ori_arr[2];

	var scyptoString = sha1(original);

	if (signature === scyptoString) {
		res.send(echostr);
	} else {
		res.send('bad token');
	}
};

exports.validateToken = validateToken;
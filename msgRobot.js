// 被动回复用户消息 
// http://mp.weixin.qq.com/wiki/1/6239b44c206cab9145b1d52c67e6c551.html
var textRobot = function (content) {
	var data = '';

	if (content.replace(/^\s/, '') == '') {
		data = '说话呀';
		return data;
	}

	if (!/^[\u4e00-\u9fa5]+$/.test(content)) {
		data = '我只会讲中文哦';
		return data;
	}


	switch(content) {
		// 非中文
		case '你好':
			data = '我好，你也好';
			break;
		case '太湖三白':
			data = '泰伯、言偃、南怀瑾';
			break;
		case '下课':
			data = '好吧，下课了';
			break;
		default: 
			data = '呵呵';
	}

	return data;
};

exports.textRobot = textRobot;
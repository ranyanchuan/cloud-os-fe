var callbackQueue = {};
var trigger = function (event) {
	try {
		var name = event.type;
		var data = event.data;
		var queue = callbackQueue[name];
	} catch (e) {
		console.log(e);
		return;
	}
	if (queue && queue.length) {
		for (var i = 0, l = queue.length; i < l; i++) {
			queue[i](data);
		}
	}
};
var on = function (name, callback) {
	var queue = callbackQueue[name];
	if (queue) {
		queue.push(callback);
	} else {
		callbackQueue[name] = [callback];
	}
};
var onData = function (callback) {
	on('execScript', callback);
};
window.diworkTools = {
	on,
	trigger,
	onData
};

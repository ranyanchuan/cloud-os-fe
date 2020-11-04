var dev = require('./dev')
var test =  require('./test')
var build = require('./prod')
var combine = require('./combine')
var pre = require('./pre')
var formal = require('./formal')
var premises = require('./premises')

var configs = {
	dev: dev,
	test: test,
	build: build,
	combine: combine,
	pre: pre,
	formal: formal,
	premises: premises,
}

module.exports = function (key) {
	var config = configs[key];
	process.env.NODE_ENV = JSON.parse(config.env)
	return config;
}

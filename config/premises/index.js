var webpackConfig = require('../webpack.build.js');
var outPut = require('../outPut');
var config = {
	env: '"premises"',
	host: '""',
	assetsSubDirectory: 'static',
	assetsPublicPath: `/fepages/${outPut}/`,
	productionSourceMap: true,
	gzip: false,
	gzipExtensions: ['js', 'css'],
	bundleAnalyzerReport: process.env.npm_config_report,
}

config.webpackConfig = webpackConfig(config);

module.exports = config;

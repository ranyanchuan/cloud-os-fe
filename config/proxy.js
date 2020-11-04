var path = require('path')
var projectId = '29035'
var api = [
  '/service/getAllServicesGroupByLabels',//废弃
  '/service/getAllServicesByLabelGroup',
  '/application/getAllAppsbyLabelGroup',
  '/application/getTopApps',
  '/desktop/getdeskTop',
  '/service/getServiceInfoByServiceCode',
  '/service/getServiceInfoByAppCode',
  '/service/getAllAppsGroupByLabels',//废弃

  '/user/setCutUser',

  '/user/getCanLoginTenants',

  '/getMessage',
  '/getSelectWidgetList',
  '/setManageList',
  '/getManageList',
  '/getLatestAccess',
  '/getPromotionService',

  '/fullText/suggest',
  '/fullText/getMore',
  '/fullText/search',
  '/fullText/getOther',
  '/getInvitationUrl',

  '/invite/getInviteUsersJoinAddress',
  '/invite/sendMessage',
  '/invite/getQRCode',

  '/manager/teamEnter/createEnter',
  '/manager/enter/info',
  '/manager/application/getAllAppsForTeam',
  '/manager/application/getAllAppsbyLabelGroup',
  '/manager/team/info',
  '/manager/team/leave',
  '/manager/team/queryUserPage',
  '/manager/team/upgradeEnter',

  '/diwork-heartbeat/heartbeat/checkSession',

  '/widget/getFolders',
  '/widget/deleteByServiceCode',
  '/widget/create',
  // '/service/getServiceInfoWithDetail',
  '/desktop/update',
  '/service/getServiceByTenantIdAndServiceCode',
  '/widget/defaultTabs',//获取首页默认标签

  '/manager/portalCtrl/getPortal',

  '/language/getAllEnable',
  '/language/current',
  '/manager/application/getApplicationTips',

  // '/menubar/getAll',
  // '/menubar/get4Edit',//桌面编辑左侧获取menubar数据
  // '/menubar/v2/get4Edit',//获取menubar数据
  '/desktop/templateTree',//获取menubar数据


  '/user/getUserInfo',
  '/defaultDesktop/query',

  '/guide/status',      // 查询向导状态
  '/enter/info',

  '/guide/lead/status', //带有遮罩的向导,获取向导状态

  '/heartbeat/ping',      // u8c 心跳检测

  "/businessdate/getCurrentDate",


  '/manager/application/getLabelApplication',

	'/portal/query',
]

var rapApi = [
  '/history/list',            // 历史记录
  '/option/log',              // 日志
  // '/menubar/getAllLight',     //大菜单
	'/manager/service/createOrUpdateService',
	'/service/getServiceInfoWithDetail',
  '/manager/service/getServiceInfo',
  '/portal/setDefault',
	'/theme/update',
	'/menubar/getAllLight/v2',
	'/manager/application/getTypeApplication',
];

var mdfApi = [
	'/user/getLoginUser',
	'/mdf/resource',
	'/meta',
	'/client/getInitFilterInfo',
	'/uniform/',
	'/viewmodel/',
]

function makeMdfConfig(key) {
	var config = {
    target: 'http://mdf-node.test.app.yyuap.com',
    changeOrigin: true,
    // pathRewrite: function (path, req) {
    //   return `/mock/370${key}`;
    // }
  };
  return config
}

// function makeRapConfig(key) {
//   var config = {
//     target: 'https://mock.yonyoucloud.com',
//     changeOrigin: true,
//     pathRewrite: function (path, req) {
//       return `/mock/370${key}`;
//     }
//   };
//   return config
// }

function makeRapConfig(key) {
  var config = {
    target: 'https://u8c-daily.yyuap.com',
    changeOrigin: true,
    // pathRewrite: function (path, req) {
    //   return `/${key}`;
    // }
  };
  return config
}

function makeStaticConfig(key) {
  var config = {
    target: 'http://localhost:3002/static',
    pathRewrite: function (path, req) {
      return key + '.json';
    }
  };
  return config;
}

function addApi() {
  var obj = {};
  var options = Array.prototype.slice.call(arguments, 0);
  options.forEach(function (options) {
    var makeConfig = options[0]
    var apis = options[1]
    apis.forEach(function (api) {
      obj[api] = makeConfig(api)
    })
  })
  return obj;
}

module.exports = addApi([makeStaticConfig, api], [makeRapConfig, rapApi], [makeMdfConfig, mdfApi])

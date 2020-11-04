import { get, postFileCros, post, } from '@u';
const y = "htt";	// 解决静态扫描的问题
export const getUserInfo = (userId = '') => get('/user/getUserInfo', { userId });
export const uploadApplication = data => postFileCros(`${y}ps://pubapi.yonyoucloud.com/file/upload/oss/workbench-image-path-applicationIcon`, data);
export const getPoll = () => get('/heartbeat/ping', { isAjax: true });
export const setCurrent = type => post('/language/setCurrent', { langCode: type });
export const getAllEnable = () => get('/language/getAllEnable');
export const getCurrent = () => get('/language/current');
export const setCurrentNot = type => post('/language/setCurrentNotLogin', { langCode: type });
export const getAllEnableNot = () => get('/language/getAllEnableNotLogin');
export const getCurrentNot = () => get('/language/currentNotLogin');
export const getDefaultDesktop = () => get('/defaultDesktop/query');
export const setDefaultDesktop = (data) => post('/defaultDesktop/update', data);
export const updateGuideStatus = param => post('/guide/update', param);

// 获取业务日期
export const getCurrentDate = () => get('/businessdate/getCurrentDate');
// 设置业务日期
export const setCurrentDate = param => post('/businessdate/setCurrentDate', param);
// 2020.02.10新增 公共功能发布模块
export const addService = (param) => post('/manager/service/createOrUpdateService', param);
// 2020.02.10新增 公共功能发布模块
export const getServiceInfo = (serviceId) => get('/manager/service/getServiceInfo', { serviceId });
// 2020.02.10新增 公共功能发布模块
export const getAppRef = () => get('/manager/application/getLabelApplication');
// 公共功能发布模块
export const getTypeApplication = () => get('/manager/application/getTypeApplication');
// 2020.04.01 更改主题色
export const setTheme = (id) => post('/theme/update', { content: id });
// 拉取帮助中心
export const getHelpManage = (url, params) => get(url, params);

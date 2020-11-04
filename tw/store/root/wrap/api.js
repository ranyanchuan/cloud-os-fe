import { get, post } from '@u';

export const getServiceInfoWithDetail = (serviceCode, serviceType = "0") => get('/service/getServiceInfoWithDetail', { serviceCode, serviceType });
export const getServiceList = () => get('/application/getTopApps');
export const getPortal = () => get('/manager/portalCtrl/getPortal');
export const cancelFolders = serviceCode => post('/widget/deleteByServiceCode', { serviceCode });
export const setFolders = (serviceCode, widgetName, parentId) => post('/widget/create', { parentId, serviceCode, type: 3, widgetName });
export const addFolders = widgetName => post('/widget/create', { type: 1, widgetName });
export const getAllMenuList = () => get('/menubar/getAllLight/v2'); // eslint-disable-line
export const getHistoryList = () => get('/history/list', { distinct: true });
export const delHistory = latestAccessCodes => post('/history/del', { latestAccessCodes });
export const delAllHistory = () => post('/history/delAll');
//带有遮罩的新手指导
export const setLeadStatus = (params) => post('/guide/lead/update', params);
// 操作日志记录
export const recordLog = (params) => post('/option/log', params);
// 查询门户
export const getAllPortal = () => get('/portal/query'); // eslint-disable-line
// 修改默认门户
export const setDefaultPortal = (params) => post('/portal/setDefault', params);

// export const validateLicense = (serviceCode) => get('/license-web/validateLicense', { serviceCode });

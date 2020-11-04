import { get, post } from '@u';

export const getWorkList = param => get('/desktop/getdeskTop', param);

// 企业中设置
export const setCreateEnter = (list, updateType) => {
  if (updateType === 'upgradeEnter') {
    // 团队升级企业
    return post('/manager/team/upgradeEnter', list);
  } else if (updateType === 'setting') {
    // 设置团队
    return post('/manager/enter/setting', list);
  } else if (updateType === 'createTeam') {
     // 创建团队
    return post('/manager/teamEnter/createTeam', list);
  }
  // 创建企业
  return post('/manager/teamEnter/createEnter', list);
};
// 获取企业信息
export const getEnterInfo = param => get(`/manager/enter/info?enterId=${param}`);

export const getApplicationList = () => (get('/manager/application/getApplicationTips'));

export const clearApplicationTips = () => post('/manager/application/clearApplicationTips', {});

import { get, post } from '@u';

export const getHistoryList = distinct => get('/history/list', { distinct });
export const delHistory = latestAccessIds => post('/history/del', { latestAccessIds });
export const delAllHistory = () => post('/history/delAll');


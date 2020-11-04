import { get, post } from '@u';
export const setManageList = list => post('/desktop/update', list);
export const getManageList = () => get('/desktop/getdeskTop');
//export const getAllMenuList = () => get('/menubar/v2/get4Edit'); // eslint-disable-line  ///menubar/v2/get4Edit
export const getAllMenuList = () => get('/desktop/templateTree');

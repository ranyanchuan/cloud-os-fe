import { createActions } from '@u';
import types from './types';
import {
  setManageList,
  getManageList,
  getAllMenuList
} from './api';

const {
  SET_MANAGE_LIST,
  GET_MANAGE_LIST,
  RETURN_DEFAULT_STATE,
  GET_ALL_MENU_LIST,
} = types;

const actions = createActions(
  {
    namespace: 'manage',
  },
  {
    [SET_MANAGE_LIST]: setManageList,
    [GET_MANAGE_LIST]: getManageList,
    [GET_ALL_MENU_LIST]: getAllMenuList,
  },
  
);
export default actions;

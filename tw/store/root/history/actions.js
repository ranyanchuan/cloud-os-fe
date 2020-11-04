import { createActions } from '@u';
import types from './types';
import {
  getHistoryList,
  delHistory,
  delAllHistory,
} from './api';

const {
  GET_HISTORY_LIST,
  DEL_HISTORY,
  DEL_ALL_HISTORY,
  CHANGE_DEL_HISTORY,
} = types;

export default createActions(
  {
    namespace: 'history',
  },
  {
    [GET_HISTORY_LIST]: getHistoryList,
    [DEL_HISTORY]: delHistory,
    [DEL_ALL_HISTORY]: delAllHistory,
  },
  CHANGE_DEL_HISTORY,
);

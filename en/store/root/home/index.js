import { handleActions } from 'redux-actions';
import actions from './actions';
import { addWidthAndHeight } from '@u';

const {
  getEnterInfo,
  getWorkList,
  changeRequestDisplay,
  closeRequestDisplay,
  openFolder,
  closeFolder,
  setCreateEnter,
  getApplicationList,
  clearApplicationTips
} = actions;

const defaultState = {
  enterInfo: {},
  workList: [],
  requestDisplay: false,
  curDisplayFolder: {
    widgetName: '',
    children: [],
  },
  folderModalDisplay: false,
  applicationList: {},
  folders: [],
};

const createReducer = key => (state, { payload, error }) => {
  if (error) {
    return state;
  }
  return {
    ...state,
    [key]: payload,
  };
};

const reducer = handleActions({
  [getEnterInfo]: createReducer('enterInfo'),
  [getWorkList]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    const { workList } = payload;
    const folders = workList.map(item => {
      return {
        ...item,
        children: []
      }
    });
    // 将无数据的分组筛选掉
    const list = workList.filter((item) => {
      return item.children.length;
    });
    list.forEach(item => {
      item.children.forEach((list, index) => {
        if (list.type === 2) {
          const arr = list.children;
          item.children.splice(index, 1);
          arr.forEach((data, key) => {
            data.parentId = item.widgetId;
            item.children.splice(index + key, 0, data);
          });
        }
      });
    });
    let keys = -1;
    _.forEach(list, g => {
      _.forEach(g.children, a => {
        addWidthAndHeight(a);
        if (!a.icon && !a.jsurl) {
          keys += 1;
          a.keys = keys;
        }
      });
    });
    return {
      ...state,
      workList: [...list],
      folders: folders,
    };
  },
  [changeRequestDisplay]: state => ({
    ...state,
    requestDisplay: true,
  }),
  [closeRequestDisplay]: state => ({
    ...state,
    requestDisplay: false,
  }),
  [openFolder]: (state, { payload: curDisplayFolder }) => ({
    ...state,
    curDisplayFolder,
    folderModalDisplay: true,
  }),
  [closeFolder]: state => ({
    ...state,
    folderModalDisplay: false,
  }),
  [setCreateEnter]: state => ({
    ...state,
  }),
  [getApplicationList]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      applicationList: payload.expiTip,
    };
  },
  [clearApplicationTips]: state => ({
    ...state,
  }),
}, defaultState);

export default reducer;

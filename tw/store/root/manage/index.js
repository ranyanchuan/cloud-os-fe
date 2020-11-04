import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  setManageList,
  getManageList,
  returnDefaultState
} = actions;

const defaultState = {
  manageList: [],
};

const findTreeById = (data, curId) => {
  let result;
  for (let i = 0, l = data.length; i < l; i += 1) {
    const menu = data[i];
    const { id, children } = menu;
    if (children && children.length) {
      result = findTreeById(children, curId);
    }
    if (result) {
      break;
    }
    if (id === curId) {
      result = menu;
      break;
    }
  }
  return result;
};
// 定义上下移动数组
function swapItems(arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
}
const defaultGroup = {
  widgetName: '',
  type: 1,
  children: [],
  isNew: true,
};

// 递归查找
let data;
function findById(manageList, id) {
  for (let i = 0; i < manageList.length; i++) {
    if (manageList[i].widgetId && manageList[i].widgetId === id) {
      data = manageList[i];
      break;
    } else {
      manageList[i].children && findById(manageList[i].children, id);
    }
  }
  return data;
}



const reducer = handleActions({

  [setManageList]: (state, { payload, error }) =>
    ({
      ...state,
      selectWidgetItem: true,
    }),
  // return state;

  [getManageList]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    // 更改了原有数据， 暂时无碍吧， 为了将数据的文件夹平铺到上一级
    const list = payload.workList;
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
    return {
      ...state,
      manageList: [...list],
      currEditonlyId: '',
    };
  },
  

  [returnDefaultState]: state => ({
    manageList: [],
  }),

}, defaultState);

export default reducer;

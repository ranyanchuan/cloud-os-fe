import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  getHistoryList,
  delHistory,
  delAllHistory,
  changeDelHistory,
} = actions;


const defaultState = {
  historyList: [],  // 历史记录
};

const reducer = handleActions({

  [getHistoryList]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      historyList: payload,
    };
  },
  [delHistory]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
    };
  },
  [changeDelHistory]: (state, { payload, error }) => {
    let { latestAccessIds } = payload;
    let newHistory = [].concat(state.historyList);

    for (let id of latestAccessIds) {
      newHistory.forEach(({ latestAccessId }, index) => {
        if (id === latestAccessId) {
          newHistory.splice(index, 1);
        }
      })
    }
    return {
      ...state,
      historyList: newHistory,
    };
  },
  [delAllHistory]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      historyList: [],
    };
  },
}, defaultState);

export default reducer;

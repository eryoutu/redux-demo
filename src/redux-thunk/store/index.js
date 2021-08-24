import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';

let logger = function ({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      console.log('老状态1 ', getState());
      next(action);
      console.log('新状态1 ', getState());
      let newState = getState();
      if (newState.number == 10) {
        dispatch({ type: 'INCREMENT', payload: -10 });
      }
    }
  }
}

// 原生redux的action只能为对象
let thunk = ({ dispatch, getState }) => next => action => {
  // 处理函数
  if (typeof action == 'function') {
    action(dispatch, getState);
  } else if (action.then && typeof action.then == 'function') {
    // 处理promise
    action.then(dispatch);//resolve后的data传给了dispatch
  } else if (action.payload && action.payload.then && typeof action.payload.then == 'function') {
    // 处理payload
    action.payload.then(
      payload => dispatch({ ...action, payload }), //resolve处理
      payload => dispatch({ ...action, payload })  //reject处理
    );
  } else {
    next(action);
  }
}


let store = createStore(
  reducer,
  { number: 0 }, //初始值
  applyMiddleware(thunk, logger)  //enhancer 增强
);
window.store = store;
export default store;
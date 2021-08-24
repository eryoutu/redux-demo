/**
 * Store就是保存数据的地方，你可以把它看成一个容器.
 * 
 * @param {Function} reducer 一个通过当前状态对象和要处理的action返回新的状态树的函数
 * @param {any} [preloadedState] 初始状态。
 * 如果你使用了combineReducers,来从根reducer中产生状态，这必须是一个和combineReducer 的keys相同形状的对象
 * @param {Function} [enhancer] 增强仓库的能力以使用第三方的能力比如中间件。redux 自带的唯一中间件是 applyMiddleware
 * 
 * @returns {Store} 是一个Redux仓库, 让你可以读取状态（getState）、派发action（dispatch）、订阅状态变化（subscribe）
 */

export default function createStore(reducer, preloadedState, enhancer) {
    // 有中间件
    if(enhancer && typeof enhancer == 'function'){
        return enhancer(createStore)(reducer, preloadedState);
    }

    let state = preloadedState;
    let listeners = [];
    function getState() {
        return JSON.parse(JSON.stringify(state));
    }

    /**
     * @param {*} action 一个描述一下你想干什么的简单JS对象
     * @returns {object} 为了方便，你派发的相同的动作对象
     * 请注意，如果你使用一个自定义中间件，你可能需要包裹 dispatch去返回别的东西(比如你等待的Promise)
     */
    function dispatch(action) {
        //接收新的动作后，通过 老状态 和新动作计算出新状态
        state = reducer(state, action);
        //然后通过所有的监听函数执行
        listeners.forEach(listener => listener());
    }
    //派发了一个动作获取初始值，其实在redux内部是派发一个INIT: '@@redux/INIT'动作
    dispatch({ type: '@@redux/INIT' });

    /**
     * @param {*} listener  每一次dispatch时被调用的监听函数
     * @returns {Function} 返回一个可以移除此监听函数的函数
     */
    function subscribe(listener) {
        listeners.push(listener);
        //返回一个取消订阅函数
        return function () {
            listeners = listeners.filter(item => item != listener)
        }
    }
    return {
        getState, dispatch, subscribe
    }
}
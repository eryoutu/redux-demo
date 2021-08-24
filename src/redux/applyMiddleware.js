import compose from './utils/compose';

// middleware 是应用的中间件
// 改装dispatch，每一次dispatch都会执行这些中间件函数
// createStore reducer 用来创建仓库  
export default function(...middlewares){
    return function (createStore){
        return function(reducer, preloadedState){
            let store = createStore(reducer, preloadedState);
            let dispatch; //重新声明一个dispatch
            let middlewareAPI = {
                getState: store.getState,
                dispatch: action=>dispatch(action) //这里是包装后的新dispatch
            }
            middlewares = middlewares.map(middleware=>middleware(middlewareAPI));
            // store.dispatch 就是next，也就是老的原生的dispatch，通过组合返回的函数传入，一直往里传到了每一个中间件函数
            // 最终返回的是处理action的一个函数
            dispatch = compose(...middlewares)(store.dispatch); 
            return {...store,dispatch}; //返回后的store也是修改后dispatch
        }
    }
}
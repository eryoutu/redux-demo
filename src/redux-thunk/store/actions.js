import * as types from './action-types';
export default {
    increment(){
        return {type:types.INCREMENT,payload:1};
    },
    //过一秒加1
    thunkIncrement(){
        return function(dispatch,getState){ //返回一个函数
            setTimeout(function(){
                dispatch({type:types.INCREMENT,payload:1});
            },1000);
        }
    },
    // promise +1
    // 问题：不能处理reject
    promiseIncrement(){
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve({type:types.INCREMENT,payload:1});
            },1000);
        });
    },
    payloadIncrement(){
        return {
            type:types.INCREMENT,
            payload: new Promise(function(resolve,reject){
                setTimeout(function(){
                    if(Math.random()>.5){
                        resolve(100); // type和100最终会被一起返回
                    }else{
                        reject(-100); // 错误处理
                    }
                },1000)
            })
        }
    }
}
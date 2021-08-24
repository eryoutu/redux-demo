// 组合：嵌套执行，把前一个函数的传给下一个函数作为参数
// 把多个函数穿成一条线，从右往左包装，返回一个函数，最终执行是嵌套的，类似于koa

export default function compose(...fns){
    if(fns.length==1)
      return fns[0];
    return fns.reduce((a,b)=>(...args)=>a(b(...args)));
}

// 之前的版本
// function compose1(...fns){
//   return function(...args){
//    let last = fns.pop();
//    return fns.reduceRight((val,fn)=>{
//         return  fn(val);  
//    },last(...args));
//   }
// }
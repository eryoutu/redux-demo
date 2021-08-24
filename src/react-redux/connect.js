import React,{Component} from 'react';
import {bindActionCreators} from '../redux';
import { ReactReduxContext } from './Context';

export default function(mapStateToProps,mapDispatchToProps){//这一层函数用来映射数据
   return function(WrapedComponent){//这一层函数用来生成一个高阶组件
      class ProxyComponent extends Component{
          static contextType = ReactReduxContext;
          constructor(props){
            super(props);
            this.store = this.context.store;
            this.state = mapStateToProps(this.store.getState()); 
          }
          componentWillMount(){
              this.unsubscribe = this.store.subscribe(()=>{
                  this.setState(mapStateToProps(this.store.getState()));//ownProps还没有处理
              });
          }
          componentWillUnmount(){
              this.unsubscribe();
          }
          render(){
              let actions= {};
              if(typeof mapDispatchToProps == 'function'){
                actions = mapDispatchToProps(this.store.disaptch);
              }else if(typeof mapDispatchToProps == 'object'){
                actions = bindActionCreators(mapDispatchToProps,this.store.dispatch);
              }
              return <WrapedComponent {...this.state} {...actions}/>
         }
      }
      return ProxyComponent;
   }
}
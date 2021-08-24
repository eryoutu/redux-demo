//用来通过上下文对象向下层组件传递数据 store
import React, { Component } from 'react';
import { ReactReduxContext } from './Context';

export default class Provider extends Component {
  render() {
    const contextValue = {
      store: this.props.store
    };
    return (
      <ReactReduxContext.Provider value={contextValue}>
        {this.props.children}
      </ReactReduxContext.Provider>)
  }
}
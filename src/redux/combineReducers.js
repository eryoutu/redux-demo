export default reducers => (state = {}, action) => Object.keys(reducers).reduce((currentState, key) => {
    // 执行所有的reducer，并设置该reducer对应的新的state
    currentState[key] = reducers[key](state[key], action);
    return currentState;
}, {});
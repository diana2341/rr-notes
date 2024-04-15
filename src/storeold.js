// store.js
import { createStore } from 'redux';

const initialState = {
  count: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'ADDNUM':
        return {...state, count: state.count + action.payload};
    case 'RESET':
        return { ...state, count:state.count = 0}
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;

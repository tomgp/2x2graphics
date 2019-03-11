import { createStore } from 'redux'

const defaultState = require('../data/example1.json');

export const actionTypes = {
  MOVE_ITEM: 'MOVE_ITEM',
  SAVE: 'SAVE',
  LOAD: 'LOAD',
  RESET: 'RESET'
}

// REDUCERS
 const reducer = (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case actionTypes.MOVE_ITEM:
      return newState;
    case actionTypes.SAVE:
      return newState;
    case actionTypes.LOAD:
      return newState;
    case actionTypes.RESET:
      return newState;
    default: 
      return newState;
  }
}

export function initializeStore (initialState = exampleInitialState) {
  return createStore(reducer, initialState);
}
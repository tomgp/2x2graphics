import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import _ from 'lodash';

const exampleInitialState = {
  title: 'EXAMPLE 2x2',
  rateableitems: [
    { name: 'Thing One', x: -0.5, y: 0.5 },
    { name: 'Thing Two', x: 0.5, y: 0.5 },
    { name: 'Thing Three', x: 0.5, y: -0.5 },
    { name: 'Thing Four', x: -0.5, y: -0.5 }
  ]
}

export const actionTypes = {
  TICK: 'TICK',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',

  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  MOVE_ITEM: 'MOVE_ITEM'
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case actionTypes.ADD_ITEM:
      console.log('add', action);
      return newState;

    case actionTypes.REMOVE_ITEM:
      console.log('remove', action);
      return newState;
      
    case actionTypes.MOVE_ITEM:
      // find the thing, and set its new x and y values
      const i = _.findIndex(newState.items, { 'name': action.name });
      newState.items[i].x = action.x;
      newState.items[i].y = action.y;
      return newState;

    default:
      return state
  }
}

// ACTIONS

export const addItem = (name, x, y) => dispatch => {
  return dispatch({ type: actionTypes.ADD_ITEM, name, x, y })
}

export const removeItem = (name) => dispatch => {
  return dispatch({ type: actionTypes.REMOVE_ITEM, name })
}

export const moveItem = (name, x, y) => dispatch => {
  return dispatch({ type: actionTypes.MOVE_ITEM, name, x, y })
}


export function initializeStore (initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(thunkMiddleware)
  )
}

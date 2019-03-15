import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import _ from 'lodash';



const exampleInitialState = {
  title: 'Loading...',
  rateableitems: []
}

export const actionTypes = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  MOVE_ITEM: 'MOVE_ITEM',
  LOAD_LIST_BEGIN: 'LOAD_LIST_BEGIN',
  LOAD_LIST_SUCCESS: 'LOAD_LIST_SUCCESS',
  LOAD_LIST_FAILURE: 'LOAD_LIST_FAILURE'
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
      const i = _.findIndex(newState.rateableitems, { 'title': action.name });
      newState.rateableitems[i].x = action.x;
      newState.rateableitems[i].y = action.y;
      return newState;

    case actionTypes.LOAD_LIST_BEGIN:
      console.log('start loading...');
      return newState;

    case actionTypes.LOAD_LIST_SUCCESS:
      console.log('success loading...');
      console.log(action.data);
      return action.data;

    case actionTypes.LOAD_LIST_FAILURE:
      console.log('failed loading :\'(');
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

const apiRoot = 'http://localhost:1337/';
const listURL = (id) => `${apiRoot}twobytwolists/${id}`;

export const loadList = (id) => {
  return dispatch => {
    dispatch({ type: actionTypes.LOAD_LIST_BEGIN });
    return fetch(listURL(id))
      .then(handleErrors)
      .then(res=>res.json())
      .then(json=>{
        dispatch({ type: actionTypes.LOAD_LIST_SUCCESS, data:json });
        return json;
      })
      .catch(err => dispatch({ type: actionTypes.LOAD_LIST_FAILURE, error:err }))

  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function initializeStore (initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(thunkMiddleware)
  )
}

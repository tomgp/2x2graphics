import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import _ from 'lodash';
import { indexURL, getItemsURL } from './storeconfig';



const exampleInitialState = {
  title: 'Loading...',
  items: [],
  worksheets: []
}

export const actionTypes = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  MOVE_ITEM: 'MOVE_ITEM',

  LOAD_ITEMS_BEGIN: 'LOAD_LIST_BEGIN',
  LOAD_ITEMS_SUCCESS: 'LOAD_LIST_SUCCESS',
  LOAD_ITEMS_FAILURE: 'LOAD_LIST_FAILURE',

  LOAD_INDEX_BEGIN: 'LOAD_INDEX_BEGIN',
  LOAD_INDEX_SUCCESS: 'LOAD_INDEX_SUCCESS',
  LOAD_INDEX_FAILURE: 'LOAD_INDEX_FAILURE'
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
      const i = _.findIndex(newState.items, { 'title': action.name });
      newState.items[i].x = action.x;
      newState.items[i].y = action.y;
      return newState;

    case actionTypes.LOAD_INDEX_BEGIN:
      console.log('start loading index items...');
      return newState;

    case actionTypes.LOAD_INDEX_SUCCESS:
      console.log('success loading index items...');
      return newState;
    
    case actionTypes.LOAD_INDEX_SUCCESS:
      console.log('fail loading index items...');
      return newState;

    case actionTypes.LOAD_ITEMS_BEGIN:
      console.log('start loading items...');
      return newState;

    case actionTypes.LOAD_ITEMS_SUCCESS:
      console.log('success loading items...');
      console.log(action.data);
      return action.data;

    case actionTypes.LOAD_ITEMS_FAILURE:
      console.log('failed loading items :\'(');
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



export const loadItems = (id) => {
  return dispatch => {
    dispatch({ type: actionTypes.LOAD_ITEMS_BEGIN });
    return fetch(getItemsURL(id))
      .then(handleErrors)
      .then(res=>res.json())
      .then(json=>{
        dispatch({ type: actionTypes.LOAD_ITEMS_SUCCESS, data:json });
        return json;
      })
      .catch(err => dispatch({ type: actionTypes.LOAD_ITEMS_FAILURE, error:err }));

  }
}

export const loadIndex = () => {
  return dispatch => {
    dispatch({ type: actionTypes.LOAD_INDEX_BEGIN });
    return fetch(indexURL)
      .then(handleErrors)
      .then(res=>res.json())
      .then(json=>{
        dispatch({ type: actionTypes.LOAD_INDEX_SUCCESS, data:json });
        return json;
      })
      .catch(err => dispatch({ type: actionTypes.LOAD_INDEX_FAILURE, error:err }));
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

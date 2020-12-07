import { createStore } from 'redux';
/* import { createStore, applyMiddleware } from 'redux' */

const enhance = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

function logger({ getState }) {
  return next => action => {
    console.log('will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    console.log('state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

export default function configureStore(reducer, initialState) {
  return createStore(reducer, initialState, enhance);
}
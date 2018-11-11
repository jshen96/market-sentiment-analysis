import { createStore, applyMiddleware } from 'redux';
import {rootReducer} from './redux/reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

let middlewareStore = [ thunk]

/*
let middlewareStore = [middleware];
if (__DEV__) {
	const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
	middlewareStore = [...middlewareStore, reduxImmutableStateInvariant, logger];
} else {
	middlewareStore = [...middlewareStore];
}
*/
function configureStore() {
  const store = createStore(
		rootReducer,
		applyMiddleware(...middlewareStore));

  return store;
}


export default configureStore;
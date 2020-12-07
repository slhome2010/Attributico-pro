import { combineReducers } from 'redux'
import smartReducer from './smartReducer'
import reloadReducer from './reloadReducer'
/* import counter2 from './counter2'
import counter from './counter'
import codedojo from './codedojo'
import friendlist from './friendlist' */

export default combineReducers({
  smartReducer,
  reloadReducer
})
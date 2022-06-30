import { combineReducers } from 'redux'
import {web3, apiReducer} from './reducers';

export default function rootReducer() {
  return combineReducers({
    web3,
    apiReducer
  })
}
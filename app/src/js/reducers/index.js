import { combineReducers } from 'redux';
import { stepModeReducer } from './stepModeReducer';
import { batchModeReducer } from './batchModeReducer';

export const rootReducer = combineReducers({
  stepMode: stepModeReducer,
  batchMode: batchModeReducer,
});

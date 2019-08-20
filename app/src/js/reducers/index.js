import { combineReducers } from 'redux';
import { createReducer } from 'redux-xstate';
import { stepModeReducer } from './stepModeReducer';
import { batchModeReducer } from './batchModeReducer';
import { appMachine } from '../stateMachine';

export const rootReducer = combineReducers({
  machine: createReducer(appMachine), // cant scope it
  stepMode: stepModeReducer,
  batchMode: batchModeReducer,
});

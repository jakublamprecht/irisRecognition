import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createMiddleware } from 'redux-xstate';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from '../reducers';
import { appMachine, appMachineActionMap } from '../stateMachine';

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(
    thunk,
    createMiddleware(appMachine, appMachineActionMap),
  )),
);

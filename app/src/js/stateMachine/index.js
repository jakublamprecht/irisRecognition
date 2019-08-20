import { Machine } from 'xstate';
import { stepModeStates } from './stepModeStates';
import { batchModeStates } from './batchModeStates';
import { initStepMode } from '../actions/stepModeActions';
import { initBatchMode } from '../actions/batchModeActions';
import * as STATES from './stateNames';
import * as TRANSITIONS from './transitions';

export const appMachineActionMap = {
  initStepMode: (dispatch) => { dispatch(initStepMode()); },
  initBatchMode: (dispatch) => { dispatch(initBatchMode()); },
};

export const appMachine = Machine({
  type: 'parallel',
  states: {
    currentMode: {
      initial: [STATES.HOME],
      states: {
        [STATES.HOME]: {
          on: {
            [TRANSITIONS.APP_STARTED]: STATES.MODE_SELECTION,
          },
        },
        [STATES.MODE_SELECTION]: {
          on: {
            [TRANSITIONS.STEP_MODE_SELECTED]: STATES.STEP_MODE,
            [TRANSITIONS.BATCH_MODE_SELECTED]: STATES.BATCH_MODE,
          },
        },
        [STATES.HISTORY_PREVIEW]: {

        },
        [STATES.STEP_MODE]: {

        },
        [STATES.BATCH_MODE]: {

        },
      },
      // TODO: DOESNT WORK
      // on: {
      //   [TRANSITIONS.RETURN_HOME]: STATES.HOME,
      // },
    },
    ...stepModeStates,
    ...batchModeStates,
  },
});

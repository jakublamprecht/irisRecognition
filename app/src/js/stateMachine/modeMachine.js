import { Machine } from 'xstate';
import * as STATES from './stateNames';
import * as TRANSITIONS from './transitions';

export const modeMachine = Machine({
  initial: [STATES.HOME],
  states: {
    [STATES.HOME]: {
      on: {
        [TRANSITIONS.STEP_MODE_SELECTED]: STATES.STEP_MODE,
        [TRANSITIONS.BATCH_MODE_SELECTED]: STATES.BATCH_MODE,
      },
    },
    [STATES.HISTORY_MODE]: {
      [TRANSITIONS.STEP_MODE_SELECTED]: STATES.STEP_MODE,
      [TRANSITIONS.BATCH_MODE_SELECTED]: STATES.BATCH_MODE,
    },
    [STATES.STEP_MODE]: {
      on: {
        [TRANSITIONS.BATCH_MODE_SELECTED]: STATES.BATCH_MODE,
        [TRANSITIONS.HISTORY_MODE_SELECTED]: STATES.HISTORY_MODE,
      },
    },
    [STATES.BATCH_MODE]: {
      on: {
        [TRANSITIONS.STEP_MODE_SELECTED]: STATES.STEP_MODE,
        [TRANSITIONS.HISTORY_MODE_SELECTED]: STATES.HISTORY_MODE,
      },
    },
  },
  on: {
    [TRANSITIONS.RETURN_HOME]: STATES.HOME,
  },
});

import { Machine } from 'xstate';
import { batchModeStates } from './batchModeStates';
import { stepModeStates} from './stepModeStates';
import { MODE_STATES } from './stateNames';
import { MODE_TRANSITIONS } from './transitions';

export const modeMachine = Machine({
  initial: [MODE_STATES.HOME],
  states: {
    [MODE_STATES.HOME]: {
      on: {
        [MODE_TRANSITIONS.STEP_MODE_SELECTED]: MODE_STATES.STEP_MODE,
        [MODE_TRANSITIONS.BATCH_MODE_SELECTED]: MODE_STATES.BATCH_MODE,
      },
    },
    // Might need to move it to the Step mode and add a history state to go back to the right step
    [MODE_STATES.HISTORY_MODE]: {
      on: {
        [MODE_TRANSITIONS.STEP_MODE_SELECTED]: MODE_STATES.STEP_MODE,
        [MODE_TRANSITIONS.BATCH_MODE_SELECTED]: MODE_STATES.BATCH_MODE,
      },
    },
    [MODE_STATES.STEP_MODE]: {
      exit: ['flushStepModeState'],
      on: {
        [MODE_TRANSITIONS.BATCH_MODE_SELECTED]: MODE_STATES.BATCH_MODE,
        [MODE_TRANSITIONS.HISTORY_MODE_SELECTED]: MODE_STATES.HISTORY_MODE,
      },
      ...stepModeStates,
    },
    [MODE_STATES.BATCH_MODE]: {
      exit: ['flushBatchModeState'],
      on: {
        [MODE_TRANSITIONS.STEP_MODE_SELECTED]: MODE_STATES.STEP_MODE,
        [MODE_TRANSITIONS.HISTORY_MODE_SELECTED]: MODE_STATES.HISTORY_MODE,
      },
      ...batchModeStates,
    },
  },
  on: {
    [MODE_TRANSITIONS.RETURN_HOME]: MODE_STATES.HOME,
  },
});

import * as STATES from './stateNames';
import * as TRANSITIONS from './transitions';

export const batchModeStates = {
  [STATES.BATCH_MODE]: {
    initial: [STATES.MODE_INACTIVE],
    states: {
      [STATES.MODE_INACTIVE]: {
        on: {
          [TRANSITIONS.BATCH_MODE_SELECTED]: {
            target: [STATES.IMAGE_SELECTION],
            actions: ['initBatchMode'],
          },
        },
      },
      [STATES.IMAGE_SELECTION]: {

      },
      [STATES.MATCHING_SELECTION]: {

      },
      [STATES.BATCH_SELECT_CONFIGURATION]: {

      },
      [STATES.BATCH_PROCESSING]: {

      },
      [STATES.BATCH_RESULTS]: {

      },
      [STATES.BATCH_RESULT_PREVIEW]: {

      },
    }
  }
};

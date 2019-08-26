import { BATCH_STEPS } from './stateNames';
import { WIZARD_TRANSITIONS } from './transitions';

export const batchModeStates = {
  initial: [BATCH_STEPS.PROCESSED_IMAGE_SELECTION],
  states: {
    [BATCH_STEPS.PROCESSED_IMAGE_SELECTION]: {
      on: {
        [WIZARD_TRANSITIONS.NEXT]: BATCH_STEPS.MATCH_IMAGE_SELECTION,
      },
    },
    [BATCH_STEPS.MATCH_IMAGE_SELECTION]: {
      on: {
        [WIZARD_TRANSITIONS.PREVIOUS]: BATCH_STEPS.PROCESSED_IMAGE_SELECTION,
        [WIZARD_TRANSITIONS.NEXT]: BATCH_STEPS.CONFIGURATION_SELECTION,
      },
    },
    [BATCH_STEPS.CONFIGURATION_SELECTION]: {
      on: {
        [WIZARD_TRANSITIONS.PREVIOUS]: BATCH_STEPS.MATCH_IMAGE_SELECTION,
        [WIZARD_TRANSITIONS.NEXT]: BATCH_STEPS.PROCESSING,
      },
    },
    [BATCH_STEPS.PROCESSING]: {
      on: {
        [WIZARD_TRANSITIONS.PROCESSING_FAILED]: BATCH_STEPS.CONFIGURATION_SELECTION,
        [WIZARD_TRANSITIONS.PROCESSING_FINISHED]: BATCH_STEPS.RESULTS_PREVIEW,
      },
    },
    [BATCH_STEPS.RESULTS_PREVIEW]: {
      on: {
        [WIZARD_TRANSITIONS.PREVIOUS]: BATCH_STEPS.CONFIGURATION_SELECTION,
      },
    },
    [BATCH_STEPS.RESULT_PREVIEW]: {
      on: {},
    },
  },
};

import { STEP_STEPS } from './stateNames';
import { WIZARD_TRANSITIONS } from './transitions';

export const stepModeStates = {
  initial: [STEP_STEPS.IMAGE_SELECTION],
  states: {
    [STEP_STEPS.IMAGE_SELECTION]: {
      on: {
        [WIZARD_TRANSITIONS.NEXT]: STEP_STEPS.PREPROCESSING,
      },
    },
    [STEP_STEPS.PREPROCESSING]: {
      on: {
        [WIZARD_TRANSITIONS.PREVIOUS]: STEP_STEPS.IMAGE_SELECTION,
        [WIZARD_TRANSITIONS.NEXT]: STEP_STEPS.SEGMENTATION,
      },
    },
    [STEP_STEPS.SEGMENTATION]: {
      on: {
        [WIZARD_TRANSITIONS.PREVIOUS]: STEP_STEPS.PREPROCESSING,
        [WIZARD_TRANSITIONS.NEXT]: STEP_STEPS.NORMALIZATION,
      },
    },
    [STEP_STEPS.NORMALIZATION]: {
      on: {
        [WIZARD_TRANSITIONS.PREVIOUS]: STEP_STEPS.SEGMENTATION,
        [WIZARD_TRANSITIONS.NEXT]: STEP_STEPS.ENCODING,
      },
    },
    [STEP_STEPS.ENCODING]: {
      on: {
        [WIZARD_TRANSITIONS.PREVIOUS]: STEP_STEPS.NORMALIZATION,
        [WIZARD_TRANSITIONS.NEXT]: STEP_STEPS.MATCHING_SELECTION,
      },
    },
    [STEP_STEPS.MATCHING_SELECTION]: {
      on: {
        [WIZARD_TRANSITIONS.PREVIOUS]: STEP_STEPS.ENCODING,
        [WIZARD_TRANSITIONS.NEXT]: STEP_STEPS.MATCHING,
      },
    },
    [STEP_STEPS.MATCHING]: {
      on: {
        [WIZARD_TRANSITIONS.PREVIOUS]: STEP_STEPS.MATCHING_SELECTION,
        [WIZARD_TRANSITIONS.NEXT]: STEP_STEPS.PROCESSING,
      },
    },
    [STEP_STEPS.PROCESSING]: {
      on: {
        [WIZARD_TRANSITIONS.PROCESSING_FAILED]: STEP_STEPS.MATCHING,
        [WIZARD_TRANSITIONS.PROCESSING_FINISHED]: STEP_STEPS.RESULTS_PREVIEW,
      },
    },
    [STEP_STEPS.RESULTS_PREVIEW]: {
      on: {
        [WIZARD_TRANSITIONS.PREVIOUS]: STEP_STEPS.RESULTS_PREVIEW,
      },
    },
  },
};

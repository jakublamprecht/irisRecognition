import * as STATES from './stateNames';
import * as TRANSITIONS from './transitions';

export const stepModeStates = {
  [STATES.STEP_MODE]: {
    initial: [STATES.MODE_INACTIVE],
    states: {
      [STATES.MODE_INACTIVE]: {
        on: {
          [TRANSITIONS.STEP_MODE_SELECTED]: {
            target: [STATES.IMAGE_SELECTION],
            actions: ['initStepMode'],
          },
        },
      },
      [STATES.IMAGE_SELECTION]: {
        on: {
          [TRANSITIONS.NEXT_STEP]: STATES.STEP_PREPROCESSING,
        },
      },
      [STATES.STEP_PREPROCESSING]: {

      },
      [STATES.STEP_SEGMENTATION]: {

      },
      [STATES.STEP_NORMALIZATION]: {

      },
      [STATES.STEP_ENCODING]: {

      },
      [STATES.MATCHING_SELECTION]: {

      },
      [STATES.STEP_MATCHING]: {

      },
      [STATES.STEP_RESULTS]: {

      },
    },
    on: {
      [TRANSITIONS.RETURN_HOME]: {
        target: STATES.MODE_INACTIVE,
        actions: ['flushStepModeState'],
      },
    },
  },
};

/*
  This could be rewritten to sth like this:

  export const stepModeStates = {
  [STATES.STEP_MODE]: {
    initial: STATES.STEP_IMAGE_SELECTION,
    states: {
      [STATES.STEP_IMAGE_SELECTION]: {

      },
      [STATES.STEP_PREPROCESSING]: {

      },
      [STATES.STEP_SEGMENTATION]: {

      },
      [STATES.STEP_NORMALIZATION]: {

      },
      [STATES.STEP_ENCODING]: {

      },
      [STATES.STEP_MATCHING]: {

      },
      [STATES.STEP_RESULTS]: {

      },
    },
    on: {
      [TRANSITIONS.RETURN_HOME]: STATES.HOME,
    }
  },
};
*/

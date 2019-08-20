import * as TRANSITIONS from '../stateMachine/transitions';

export const goToModeSelection = () => ({
  type: TRANSITIONS.APP_STARTED,
});

export const returnHome = () => ({
  type: TRANSITIONS.RETURN_HOME,
});

export const openStepMode = () => ({
  type: TRANSITIONS.STEP_MODE_SELECTED,
});

export const openBatchMode = () => ({
  type: TRANSITIONS.BATCH_MODE_SELECTED,
});

export const transitionToNextStep = () => ({
  type: TRANSITIONS.NEXT_STEP,
});

export const transitionToPreviousStep = () => ({
  type: TRANSITIONS.PREVIOUS_STEP,
});

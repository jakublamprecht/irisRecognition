import { STEP_MODE_ACTION_TYPES } from '../constants/actionTypes';

export const flushStepModeState = () => ({
  type: STEP_MODE_ACTION_TYPES.FLUSH_STATE,
});

export const setStepData = (stepId, data) => ({
  type: STEP_MODE_ACTION_TYPES.SET_STEP_DATA,
  stepId,
  data,
});

export const clearStepData = (stepId) => ({
  type: STEP_MODE_ACTION_TYPES.CLEAR_STEP_DATA,
  stepId,
});

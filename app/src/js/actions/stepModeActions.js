import { STEP_MODE_ACTION_TYPES } from '../constants/actionTypes';

export const flushStepModeState = () => ({
  type: STEP_MODE_ACTION_TYPES.FLUSH_STATE,
});

export const addHistoryImage = (stepId, image) => ({
  type: STEP_MODE_ACTION_TYPES.ADD_HISTORY_IMAGE_ENTRY,
  stepId,
  image,
});

export const setStepData = (stepId, data) => ({
  type: STEP_MODE_ACTION_TYPES.SET_STEP_DATA,
  stepId,
  data,
});

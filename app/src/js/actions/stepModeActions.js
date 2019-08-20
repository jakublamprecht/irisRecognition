import * as ACTION_TYPES from '../constants/actionTypes';

export const stepFlushState = () => ({
  type: ACTION_TYPES.STEP_FLUSH_STATE,
});

export const initStepMode = () => ({
  type: ACTION_TYPES.STEP_MODE_INIT,
});

export const setSelectedImage = (imagePath) => ({
  type: ACTION_TYPES.STEP_IMAGE_SELECTED,
  imagePath,
});

export const setCurrentImage = (filePath) => ({
  type: ACTION_TYPES.STEP_SET_CURRENT_IMAGE,
  filePath,
});

export const revertLastStep = () => ({
  type: ACTION_TYPES.STEP_REVERT_LAST_STEP,
});

export const addHistoryEntry = (stepId, isMulti, entry) => ({
  type: ACTION_TYPES.STEP_ADD_HISTORY_ENTRY,
  stepId,
  isMulti,
  entry,
});

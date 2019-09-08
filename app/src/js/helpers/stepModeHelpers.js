import { STEP_STEPS } from '../stateMachine/stateNames';

// could possibly then be used with createSelector: getProperty = createSelector(getStepData, (data) => data.property)
export const getStepData = (stepId) => (state) => state.stepMode[stepId];

export const getWorkingImage = (state) => {
  const lastSavedPreprocessing = state.stepMode[STEP_STEPS.PREPROCESSING].slice(-1)[0] || {};

  return lastSavedPreprocessing.image || state.stepMode[STEP_STEPS.IMAGE_SELECTION].proxyImage;
};

export const isEmptyObject = (obj) => (
  Object.entries(obj).length === 0 && obj.constructor === Object
);

import * as ACTION_TYPES from '../constants/actionTypes';
import { batchModeSteps } from '../conf/steps.conf';

const initialState = {
  currentStepId: null,
  processingProgress: null,
  processedImages: [], // either [] or {} with id keys
  matchedImages: [],
  batchModeConfig: {},
  results: {},
  currentPreview: null,
};

export const batchModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.BATCH_FLUSH_STATE:
      return { ...state, ...initialState };
    case ACTION_TYPES.BATCH_MODE_INIT:
      return { ...state, currentStepId: batchModeSteps[0].id };
    default:
      return state;
  }
};

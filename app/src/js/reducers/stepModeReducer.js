import { STEP_STEPS } from '../stateMachine/stateNames';
import { STEP_MODE_ACTION_TYPES } from '../constants/actionTypes';

const initialState = {
  [STEP_STEPS.IMAGE_SELECTION]: {
    selectedImage: '',
    proxyImage: '',
  },
  [STEP_STEPS.PREPROCESSING]: [],
  [STEP_STEPS.SEGMENTATION]: {},
  [STEP_STEPS.NORMALIZATION]: {},
  [STEP_STEPS.ENCODING]: {},
  [STEP_STEPS.MATCHING_IMAGE_SELECTION]: {},
  [STEP_STEPS.MATCHING]: {},
  [STEP_STEPS.PROCESSING]: {},
  [STEP_STEPS.RESULTS_PREVIEW]: {},
};

export const stepModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case STEP_MODE_ACTION_TYPES.FLUSH_STATE:
      return initialState;
    case STEP_MODE_ACTION_TYPES.CLEAR_STEP_DATA:
      return {
        ...state,
        [action.stepId]: initialState[action.stepId],
      };
    case STEP_MODE_ACTION_TYPES.SET_STEP_DATA:
      return {
        ...state,
        [action.stepId]: action.data,
      };
    default:
      return state;
  }
};

import { STEP_STEPS } from '../stateMachine/stateNames';
import { STEP_MODE_ACTION_TYPES } from '../constants/actionTypes';

const initialState = {
  [STEP_STEPS.IMAGE_SELECTION]: {
    processingImage: '',
  },
  [STEP_STEPS.PREPROCESSING]: [],
  historyImages: {},
};

export const stepModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case STEP_MODE_ACTION_TYPES.FLUSH_STATE:
      return initialState;
    case STEP_MODE_ACTION_TYPES.ADD_HISTORY_IMAGE_ENTRY:
      return {
        ...state,
        historyImages: {
          ...state.historyImages,
          [action.stepId]: action.image,
        },
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

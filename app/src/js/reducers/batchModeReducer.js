import { BATCH_MODE_ACTION_TYPES } from '../constants/actionTypes';

const initialState = {
  processingImages: [],
  matchingImages: [],
  configFile: '',
  results: {},
};

export const batchModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case BATCH_MODE_ACTION_TYPES.SET_PROCESSING_IMAGES:
      return {
        ...state,
        processingImages: action.processingImages,
      };
    case BATCH_MODE_ACTION_TYPES.SET_MATCHING_IMAGES:
      return {
        ...state,
        matchingImages: action.matchingImages,
      };
    case BATCH_MODE_ACTION_TYPES.SET_CONFIG_FILE:
      return {
        ...state,
        configFile: action.configFile,
      };
    case BATCH_MODE_ACTION_TYPES.SET_RESULTS:
      return {
        ...state,
        results: action.results,
      };
    case BATCH_MODE_ACTION_TYPES.CLEAR_MATCHING_IMAGES:
      return {
        ...state,
        matchingImages: initialState.matchingImages,
      };
    case BATCH_MODE_ACTION_TYPES.CLEAR_CONFIG_FILE:
      return {
        ...state,
        configFile: initialState.configFile,
      };
    case BATCH_MODE_ACTION_TYPES.CLEAR_RESULTS:
      return {
        ...state,
        results: initialState.results,
      };
    default:
      return state;
  }
};

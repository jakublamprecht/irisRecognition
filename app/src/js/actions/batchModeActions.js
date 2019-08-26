import { BATCH_MODE_ACTION_TYPES } from '../constants/actionTypes';

export const flushBatchModeState = () => ({
  type: BATCH_MODE_ACTION_TYPES.FLUSH_STATE,
});

export const setProcessingImages = (processingImages) => ({
  type: BATCH_MODE_ACTION_TYPES.SET_PROCESSING_IMAGES,
  processingImages,
});

export const setMatchingImages = (matchingImages) => ({
  type: BATCH_MODE_ACTION_TYPES.SET_MATCHING_IMAGES,
  matchingImages,
});

export const clearMatchingImages = () => ({
  type: BATCH_MODE_ACTION_TYPES.CLEAR_MATCHING_IMAGES,
});

export const setConfigFile = (configFile) => ({
  type: BATCH_MODE_ACTION_TYPES.SET_CONFIG_FILE,
  configFile,
});

export const clearConfigFile = () => ({
  type: BATCH_MODE_ACTION_TYPES.CLEAR_CONFIG_FILE,
});

export const setResults = (results) => ({
  type: BATCH_MODE_ACTION_TYPES.SET_RESULTS,
  results,
});

export const clearResults = () => ({
  type: BATCH_MODE_ACTION_TYPES.CLEAR_RESULTS,
});

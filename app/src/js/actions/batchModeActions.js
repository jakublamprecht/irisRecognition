import * as ACTION_TYPES from '../constants/actionTypes';

export const batchFlushState = () => ({
  type: ACTION_TYPES.BATCH_FLUSH_STATE,
});

export const initBatchMode = () => ({
  type: ACTION_TYPES.BATCH_MODE_INIT,
});

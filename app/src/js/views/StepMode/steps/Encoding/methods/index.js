import { Loggabor } from './Loggabor';
import { encodeLogGabor } from '../../../../../api';

export const METHOD_IDS = {
  LOG_GABOR: 'LOG_GABOR',
};

export const methodConfigs = {
  [METHOD_IDS.LOG_GABOR]: {
    title: 'Log Gabor Filters',
    form: Loggabor,
    handler: encodeLogGabor,
  },
};

import { Daugman } from './Daugman';
import { normalizeDaugman } from '../../../../../api';

export const METHOD_IDS = {
  DAUGMAN: 'DAUGMAN',
};

export const methodConfigs = {
  [METHOD_IDS.DAUGMAN]: {
    title: 'Daugman Rubber Sheet Model',
    form: Daugman,
    handler: normalizeDaugman,
  },
};

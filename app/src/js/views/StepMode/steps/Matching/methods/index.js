import { Hamming } from './Hamming';

export const METHOD_IDS = {
  HAMMING: 'HAMMING',
};

export const methodConfigs = {
  [METHOD_IDS.HAMMING]: {
    title: 'Hamming Distance',
    form: Hamming,
  },
};

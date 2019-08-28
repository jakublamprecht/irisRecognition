import React from 'react';
import { Gauss } from './Gauss';
import { Median } from './Median';

import { gaussianBlur, medianBlur, normalizeHistogram } from '../../.././../../api';

export const METHOD_IDS = {
  GAUSS: 'GAUSS',
  MEDIAN: 'MEDIAN',
  HISTOGRAM_NORMALIZATION: 'HISTOGRAM_NORMALIZATION',
};

export const methodConfigs = {
  [METHOD_IDS.GAUSS]: {
    title: 'Gauss',
    form: Gauss,
    handler: gaussianBlur,
  },
  [METHOD_IDS.MEDIAN]: {
    title: 'Median',
    form: Median,
    handler: medianBlur,
  },
  [METHOD_IDS.HISTOGRAM_NORMALIZATION]: {
    title: 'Histogram normalization',
    form: <></>,
    handler: normalizeHistogram,
    noParams: true,
  },
};

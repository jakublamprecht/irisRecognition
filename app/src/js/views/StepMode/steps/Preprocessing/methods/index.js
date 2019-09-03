import React from 'react';
import { Gauss } from './Gauss';
import { Median } from './Median';
import { Filter2D } from './Filter2D';

import { gaussianBlur, medianBlur, normalizeHistogram, filter2D } from '../../.././../../api';

export const METHOD_IDS = {
  GAUSS: 'GAUSS',
  MEDIAN: 'MEDIAN',
  HISTOGRAM_NORMALIZATION: 'HISTOGRAM_NORMALIZATION',
  FILTER_2D: 'FILTER_2D',
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
  [METHOD_IDS.FILTER_2D]: {
    title: '2D Convolution',
    form: Filter2D,
    handler: filter2D,
  },
  [METHOD_IDS.HISTOGRAM_NORMALIZATION]: {
    title: 'Histogram normalization',
    form: <></>,
    handler: normalizeHistogram,
    noParams: true,
  },
};

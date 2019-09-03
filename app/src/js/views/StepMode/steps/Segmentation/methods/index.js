import { Hough } from './Hough';
import { Daugman } from './Daugman';
import { ActiveContours } from './ActiveContours';

export const METHOD_IDS = {
  DAUGMAN: 'DAUGMAN',
  HOUGH: 'HOUGH',
  ACTIVE_CONTOURS: 'ACTIVE_CONTOURS',
};

export const methodConfigs = {
  [METHOD_IDS.DAUGMAN]: {
    title: 'Daugman',
    form: Daugman,
    handler: function(){},
  },
  [METHOD_IDS.HOUGH]: {
    title: 'Hough',
    form: Hough,
    handler: function(){},
  },
  [METHOD_IDS.ACTIVE_CONTOURS]: {
    title: 'Active contours',
    form: ActiveContours,
    handler: function(){},
  },
};

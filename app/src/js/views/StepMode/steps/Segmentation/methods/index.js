export const SEGM_METHOD_IDS = {
  DAUGMAN: 'Daugman',
  HOUGH: 'Hough',
  ACTIVE_CONTOURS: 'ActiveContours',
};

export const NOISE_METHOD_IDS = {
  RADIAL_CUTOFF: 'radialCutoff',
  COMMON_POINTS: 'commonPoints',
  PARABOLIC_APPROXIMATION: 'parabolicApproximation',
  NONE: 'none',
};

export const segmentationMethodConfigs = {
  [SEGM_METHOD_IDS.DAUGMAN]: {
    title: 'Daugman',
  },
  [SEGM_METHOD_IDS.HOUGH]: {
    title: 'Hough',
  },
  [SEGM_METHOD_IDS.ACTIVE_CONTOURS]: {
    title: 'Active contours',
  },
};

export const noiseMethodConfigs = {
  [NOISE_METHOD_IDS.RADIAL_CUTOFF]: {
    title: 'Radial cutoff',
  },
  [NOISE_METHOD_IDS.COMMON_POINTS]: {
    title: 'Common points',
  },
  [NOISE_METHOD_IDS.PARABOLIC_APPROXIMATION]: {
    title: 'Parabolic approximation',
  },
  [NOISE_METHOD_IDS.NONE]: {
    title: 'None',
  },
};

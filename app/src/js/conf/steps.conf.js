import { STEP_MODE_STEP_IDS, BATCH_MODE_STEP_IDS } from '../constants/common';

export const stepModeSteps = [
  {
    // Maybe change those ids to state names?
    id: STEP_MODE_STEP_IDS.UPLOAD,
    title: 'File selection',
    hasPreview: false, // if hasPreview is set to false, transition to next has to be called manually from components, since no next button will be rendered in wizard
    isMulti: false,
  },
  {
    id: STEP_MODE_STEP_IDS.PREPROCESSING,
    title: 'Preprocessing',
  },
  {
    id: STEP_MODE_STEP_IDS.SEGMENTATION,
    title: 'Segmentation',
  },
  {
    id: STEP_MODE_STEP_IDS.NORMALIZATION,
    title: 'Normalization',
  },
  {
    id: STEP_MODE_STEP_IDS.ENCODING,
    title: 'Encoding',
  },
  {
    id: STEP_MODE_STEP_IDS.MATCHING,
    title: 'Matching',
    // somwhere here maybe config for what is inside the step form?
  },
];

export const batchModeSteps = [];

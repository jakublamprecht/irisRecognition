import React from 'react';
import { Mode } from '../../components/Mode';
import { Wizard } from '../../components/Wizard';
import { STEP_STEPS } from '../../stateMachine/stateNames';

import { stepComponents } from './steps';

const stepWizardConfig = {
  [STEP_STEPS.IMAGE_SELECTION]: {
    title: 'Processed Images',
    content: stepComponents.ImageSelection,
  },
  [STEP_STEPS.PREPROCESSING]: {
    title: 'Preprocessing',
    content: stepComponents.Preprocessing,
  },
  [STEP_STEPS.SEGMENTATION]: {
    'title': 'Segmentation',
  },
  [STEP_STEPS.NORMALIZATION]: {
    title: 'Normalization',
  },
  [STEP_STEPS.ENCODING]: {
    title: 'Encoding',
  },
  [STEP_STEPS.MATCHING_IMAGE_SELECTION]: {
    title: 'Matched Images',
  },
  [STEP_STEPS.MATCHING]: {
    title: 'Matching',
  },
  [STEP_STEPS.PROCESSING]: {
    title: 'Processing',
  },
  [STEP_STEPS.RESULTS_PREVIEW]: {
    title: 'Results',
  },
};

export const StepMode = () => {
  return (
    <Mode>
      <Wizard config={stepWizardConfig}/>
    </Mode>
  );
};

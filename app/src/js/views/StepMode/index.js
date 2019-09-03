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
    content: stepComponents.Segmentation,
  },
  [STEP_STEPS.NORMALIZATION]: {
    title: 'Normalization',
    content: <></>,
  },
  [STEP_STEPS.ENCODING]: {
    title: 'Encoding',
    content: <></>,
  },
  [STEP_STEPS.MATCHING_IMAGE_SELECTION]: {
    title: 'Matched Images',
    content: <></>,
  },
  [STEP_STEPS.MATCHING]: {
    title: 'Matching',
    content: <></>,
  },
  [STEP_STEPS.PROCESSING]: {
    title: 'Processing',
    content: <></>,
  },
  [STEP_STEPS.RESULTS_PREVIEW]: {
    title: 'Results',
    content: <></>,
  },
};

export const StepMode = () => {
  return (
    <Mode>
      <Wizard config={stepWizardConfig}/>
    </Mode>
  );
};

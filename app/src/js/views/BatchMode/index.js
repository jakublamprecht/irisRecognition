import React from 'react';
import { Mode } from '../../components/Mode';
import { Wizard } from '../../components/Wizard';
import { BATCH_STEPS } from '../../stateMachine/stateNames';
import { stepComponents } from './steps';

const batchWizardConfig = {
  [BATCH_STEPS.PROCESSED_IMAGE_SELECTION]: {
    title: 'Processed Images',
    content: stepComponents.ProcessingImagesSelection,
    // content: stepComponents.Results,
  },
  [BATCH_STEPS.MATCH_IMAGE_SELECTION]: {
    title: 'Matched images',
    content: stepComponents.MatchingImagesSelection,
  },
  [BATCH_STEPS.CONFIGURATION_SELECTION]: {
    'title': 'Configuration',
    content: stepComponents.ConfigSelection,
  },
  [BATCH_STEPS.PROCESSING]: {
    title: 'Processing',
    content: stepComponents.Processing,
  },
  [BATCH_STEPS.RESULTS_PREVIEW]: {
    title: 'Results',
    content: stepComponents.Results,
  },
};

export const BatchMode = () => {
  return (
    <Mode>
      <Wizard config={batchWizardConfig}/>
    </Mode>
  );
};

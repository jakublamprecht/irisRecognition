import React from 'react';
import { Mode } from '../../components/Mode';
import { Wizard } from '../../components/Wizard';
import { BATCH_STEPS } from '../../stateMachine/stateNames';
import { ProcessedImageSelection } from './steps/ProcessedImageSelection';
import { MatchingImageSelection } from './steps/MatchingImageSelection';
import { ConfigSelection } from './steps/ConfigSelection';
import { Processing } from './steps/Processing';

const batchWizardConfig = {
  [BATCH_STEPS.PROCESSED_IMAGE_SELECTION]: {
    title: 'Processed Images',
    content: <ProcessedImageSelection/>,
  },
  [BATCH_STEPS.MATCH_IMAGE_SELECTION]: {
    title: 'Matched images',
    content: <MatchingImageSelection/>,
  },
  [BATCH_STEPS.CONFIGURATION_SELECTION]: {
    'title': 'Configuration',
    content: <ConfigSelection/>,
  },
  [BATCH_STEPS.PROCESSING]: {
    title: 'Processing',
    content: <Processing/>,
  },
  [BATCH_STEPS.RESULTS_PREVIEW]: {
    title: 'Results',
  },
};

export const BatchMode = () => {
  return (
    <Mode>
      <Wizard config={batchWizardConfig}/>
    </Mode>
  );
};

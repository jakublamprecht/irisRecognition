import React from 'react';
import { STEP_MODE_STEP_IDS } from '../constants/common';
import ProcessingWizardUploadForm from './stepMode/ProcessingWizardUploadForm';
import ProcessingWizardPreprocessingForm from './stepMode/ProcessingWizardPreprocessingForm';

const renderForm = (stepId, transitionProps) => {
  switch(stepId) {
    case STEP_MODE_STEP_IDS.UPLOAD:
      return <ProcessingWizardUploadForm { ...transitionProps }/>
    case STEP_MODE_STEP_IDS.PREPROCESSING:
      return <ProcessingWizardPreprocessingForm { ...transitionProps }/>
    case STEP_MODE_STEP_IDS.SEGMENTATION:
    case STEP_MODE_STEP_IDS.NORMALIZATION:
    case STEP_MODE_STEP_IDS.ENCODING:
    case STEP_MODE_STEP_IDS.MATCHING:
    default:
      return <div>Dupa2</div>
  }
}

const ProcessingWizardStep = ({ step, ...transitionProps }) => (
  <div className="wizard-step fill-height">
    { renderForm(step.id, transitionProps) }
  </div>
);

export default ProcessingWizardStep;

import React from 'react';
import { batchModeSteps } from '../conf/steps.conf';
import ProcessingWizard from '../containers/ProcessingWizard';

const BatchModeWizard = () => (
  <ProcessingWizard steps={ batchModeSteps }/>
);

export default BatchModeWizard;

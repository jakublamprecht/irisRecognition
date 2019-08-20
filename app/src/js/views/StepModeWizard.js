import React from 'react';
import { stepModeSteps } from '../conf/steps.conf';
import ProcessingWizard from '../containers/ProcessingWizard';

const StepModeWizard = () => (
  <ProcessingWizard steps={ stepModeSteps }/>
);

export default StepModeWizard;

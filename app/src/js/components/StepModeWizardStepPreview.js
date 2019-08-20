import React from 'react';
import { connect } from 'react-redux';

const StepModeWizardStepPreview = ({ currentImagePath }) => (
  <>
    <img className="wizard-step-preview" src={ currentImagePath }/>
  </>
);

const mapStateToProps = (state) => ({
  currentImagePath: state.stepMode.currentImage
});

export default connect(mapStateToProps)(StepModeWizardStepPreview);

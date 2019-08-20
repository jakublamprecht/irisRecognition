import React, { useState } from 'react';
import { connect } from 'react-redux';
import StepModeWizardStepParams from '../../components/StepModeWizardParams';
import StepModeWizardStepPreview from '../../components/StepModeWizardStepPreview';
import { Select } from 'antd';
import { preprocessingMethods } from '../../conf/preprocessingMethods.conf';
import { STEP_MODE_STEP_IDS } from '../../constants/common';
import * as API from '../../api';

const renderSelectOptions = (methods) => (
  Object.values(methods).map((method) => (
    <Select.Option key={method.id} value={method.id}>
      {method.name}
    </Select.Option>
  ))
);

const ProcessingWizardPreprocessingForm = ({ currentImage }) => {
  const { methods, defaultMethod }= preprocessingMethods;
  const [currentMethod, setCurrentMethod] = useState(defaultMethod);

  const handleMethodChange = (methodId) => { setCurrentMethod(methodId) };

  const getProcessingMethod = () => {
    switch (currentMethod) {
      default:
        return API.gaussianBlur.bind(API.gaussianBlur, currentImage);
    };
  };

  return (
    <>
      <StepModeWizardStepPreview/>
      <div className="wizard-step-params">
        <Select defaultValue={defaultMethod} onChange={handleMethodChange}>
          { renderSelectOptions(methods) }
        </Select>
        <StepModeWizardStepParams
          stepId={ STEP_MODE_STEP_IDS.PREPROCESSING }
          inputs={ methods[currentMethod].inputs }
          onSubmit={ getProcessingMethod() }
          isMulti={ true }
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentImage: state.stepMode.currentImage,
});

export default connect(mapStateToProps)(ProcessingWizardPreprocessingForm);

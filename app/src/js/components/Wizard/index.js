import React, { useContext } from 'react';
import { ModeMachineContext } from '../../helpers/modeMachineContext';
import {
  WizardSteps,
  WizardStep,
  WizardWrapper,
} from './styles';

export const Wizard = ({ config }) => {
  const { currentModeState } = useContext(ModeMachineContext);
  const stepKeysArray = Object.keys(config);
  const currentStep = currentModeState.toStrings().pop().split('.').pop(); // getting rid of mode prefix

  const isCurrentStep = (stepId) => stepId === currentStep;

  const isStepBeforeCurrent = (stepId) => {
    const currentStepIndex = stepKeysArray.indexOf(currentStep);
    const stepIndex = stepKeysArray.indexOf(stepId);

    return stepIndex < currentStepIndex;
  };

  const renderStepContent = () => {
    const StepContent = config[currentStep].content;
    const props = {
      stepId: currentStep,
      isFirst: (stepKeysArray.indexOf(currentStep) === 0),
      isLast: (stepKeysArray.indexOf(currentStep) === stepKeysArray.length - 1),
    };

    return <StepContent {...props}/>;
  };

  return (
    <WizardWrapper>
      <WizardSteps>
        { Object.entries(config).map(([stepId, stepData]) => (
          <WizardStep
            key={stepId}
            title={stepData.title}
            status={
              isCurrentStep(stepId)
              ? 'process'
              : isStepBeforeCurrent(stepId)
                ? 'finish'
                : 'wait'
            }/>
        ))}
      </WizardSteps>
      { renderStepContent() }
    </WizardWrapper>
  );
};

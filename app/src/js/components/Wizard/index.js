import React, { useContext } from 'react';
import { Icon } from 'antd';
import { ModeMachineContext } from '../../helpers/modeMachineContext';
import { WIZARD_TRANSITIONS } from '../../stateMachine/transitions';
import {
  WizardSteps,
  WizardStep,
  WizardStepContentWrapper,
  WizardWrapper,
  WizardButtonsWrapper,
  WizardButton,
} from './styles';

export const Wizard = ({ config }) => {
  const { currentModeState, transitionMode } = useContext(ModeMachineContext);
  const stepKeysArray = Object.keys(config);
  const currentStep = currentModeState.toStrings().pop().split('.').pop(); // getting rid of mode prefix

  const goToNextStep = () => transitionMode(WIZARD_TRANSITIONS.NEXT);
  const goToPreviousStep = () => transitionMode(WIZARD_TRANSITIONS.PREVIOUS);

  const onNextClick = () => {
    if (config[currentStep].onNextClick) {
      config[currentStep].onNextClick();
    }

    goToNextStep();
  };

  const onPrevClick = () => {
    if (config[currentStep].onNextClick) {
      config[currentStep].onPrevClick();
    }

    goToPreviousStep();
  };

  const isCurrentStep = (stepId) => stepId === currentStep;

  const isStepBeforeCurrent = (stepId) => {
    const currentStepIndex = stepKeysArray.indexOf(currentStep);
    const stepIndex = stepKeysArray.indexOf(stepId);

    return stepIndex < currentStepIndex;
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
      <WizardStepContentWrapper>
        { config[currentStep].content }
      </WizardStepContentWrapper>
      <WizardButtonsWrapper>
        {
          (stepKeysArray.indexOf(currentStep) !== 0) &&
          <WizardButton onClick={onPrevClick}>
            <Icon type='caret-left'/>Previous Step
          </WizardButton>
        }
        {
          (stepKeysArray.indexOf(currentStep) !== stepKeysArray.length - 1) &&
          <WizardButton onClick={onNextClick} type='primary'>
            Next Step<Icon type='caret-right'/>
          </WizardButton>
        }
      </WizardButtonsWrapper>
    </WizardWrapper>
  );
};

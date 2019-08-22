import React from 'react';
import { Icon } from 'antd';
import { WIZARD_TRANSITIONS } from '../../stateMachine/transitions';

export const WizardStep = ({ children, isFirst, isLast }) => {
  const goToNextStep = () => transitionMode(WIZARD_TRANSITIONS.NEXT);
  const goToPreviousStep = () => transitionMode(WIZARD_TRANSITIONS.PREVIOUS);

  // TODO: add guards on next clicks
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

  return (
    <>
      <WizardStepContentWrapper>
        { children }
      </WizardStepContentWrapper>
      <WizardButtonsWrapper>
        {
          !isFirst &&
          <WizardButton onClick={onPrevClick}>
            <Icon type='caret-left'/>Previous Step
          </WizardButton>
        }
        {
          !isLast &&
          <WizardButton onClick={onNextClick} type='primary'>
            Next Step<Icon type='caret-right'/>
          </WizardButton>
        }
      </WizardButtonsWrapper>
    </>
  );
};

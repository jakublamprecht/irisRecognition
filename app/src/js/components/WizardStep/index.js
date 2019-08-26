import React, { useContext } from 'react';
import { Icon } from 'antd';
import { ModeMachineContext } from '../../helpers/modeMachineContext';
import { WIZARD_TRANSITIONS } from '../../stateMachine/transitions';
import {
  WizardStepWrapper,
  WizardStepContentWrapper,
  WizardButtonsWrapper,
  WizardButton,
} from './styles';

export const WizardStep = ({ children, isFirst, isLast, onNextTransition, onPreviousTransition }) => {
  const { transitionMode } = useContext(ModeMachineContext);
  const goToNextStep = () => transitionMode(WIZARD_TRANSITIONS.NEXT);
  const goToPreviousStep = () => transitionMode(WIZARD_TRANSITIONS.PREVIOUS);

  // TODO: add guards on next clicks
  const onNextClick = () => {
    if (onNextTransition) {
      onNextTransition();
    }

    goToNextStep();
  };

  const onPrevClick = () => {
    if (onPreviousTransition) {
      onPreviousTransition();
    }

    goToPreviousStep();
  };

  return (
    <WizardStepWrapper>
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
    </WizardStepWrapper>
  );
};

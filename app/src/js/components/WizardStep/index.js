import React, { useContext } from 'react';
import { Icon, notification } from 'antd';
import { ModeMachineContext } from '../../helpers/modeMachineContext';
import { WIZARD_TRANSITIONS } from '../../stateMachine/transitions';
import {
  WizardStepWrapper,
  WizardStepContentWrapper,
  WizardButtonsWrapper,
  WizardButton,
} from './styles';

export const WizardStep = ({ children, isFirst, isLast, onNextTransition, nextTransitionGuard, onPreviousTransition }) => {
  const { transitionMode } = useContext(ModeMachineContext);
  const goToNextStep = () => transitionMode(WIZARD_TRANSITIONS.NEXT);
  const goToPreviousStep = () => transitionMode(WIZARD_TRANSITIONS.PREVIOUS);

  const onNextClick = async () => {
    if (nextTransitionGuard) {
      const { canTransition, description } = nextTransitionGuard();

      if (!canTransition) {
        notification.error({
          message: 'Transition failed',
          placement: 'bottomLeft',
          duration: 3,
          description
        });

        return false;
      };
    }

    if (onNextTransition) {
      await onNextTransition();
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

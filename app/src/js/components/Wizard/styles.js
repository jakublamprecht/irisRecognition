import styled from 'styled-components';
import { Button, Steps } from 'antd';

const { Step } = Steps;

export const WizardWrapper = styled.div`
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

export const WizardStepContentWrapper = styled.div`
  padding-top: 20px;
  flex: 1;
`;

export const WizardButtonsWrapper = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
`;

export const WizardButton = styled(Button)`
  margin-left: 5px;
`;

export const WizardSteps = styled(Steps)`
  padding-bottom: 20px !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
`;

export const WizardStep = Step;

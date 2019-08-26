import styled from 'styled-components';
import { Steps } from 'antd';

const { Step } = Steps;

export const WizardWrapper = styled.div`
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

export const WizardSteps = styled(Steps)`
  padding-bottom: 20px !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
`;

export const WizardStep = Step;

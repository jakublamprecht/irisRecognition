import styled from 'styled-components';
import { Row, Button, Col } from 'antd';
import { MethodSelector } from '../StepMode/MethodSelector';

export const WizardStepWrapper = styled(Row)`
  flex: 1;
  display: flex !important;
  flex-direction: column !important;
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

// Common styling for Content of steps

export const Column = styled(Col)`
  display: flex !important;
  flex-direction: column !important;
  height: 100%;
`;

export const MethodSwitcher = styled(MethodSelector)`
  flex: 1;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 15px;
`;

export const ActionButton = styled(Button)`
  margin-left: 5px;
`;

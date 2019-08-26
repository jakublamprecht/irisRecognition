import styled from 'styled-components';
import { Row, Button } from 'antd';

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

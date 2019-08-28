import styled from 'styled-components';
import { Button, Col } from 'antd';

import { MethodSelector } from '../../../../components/StepMode/MethodSelector';

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

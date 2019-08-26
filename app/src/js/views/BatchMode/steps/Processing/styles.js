import styled from 'styled-components';
import { Icon, Progress } from 'antd';

export const ProcessingWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProcessingIcon = styled(Icon)`
  color: #40a9ff;
  font-size: 6rem;
  padding-bottom: 50px;
`;

export const ProcessingProgress = styled(Progress)`
  padding-top: 30px !important;
  max-width: 50%;
`;

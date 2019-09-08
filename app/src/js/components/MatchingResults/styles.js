import styled from 'styled-components';
import { Button, Icon } from 'antd';

export const ResultsWrapper = styled.div`
  width: 100%;
`;

export const ToggleButton = styled(Button)`
  display: flex !important;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
`;

export const ToggleButtonContent = styled.div`
  display: flex;
  flex-grow: 1;
`;

export const ToggleButtonIcon = styled(Icon)`
  justify-self: flex-end;
`;

export const ContentWrapper = styled.div`
`;

import styled from 'styled-components';
import { Col } from 'antd';

export const Column = styled(Col)`
  padding: 15px;
`;

export const MatchStatus = styled.span`
  color: ${props => props.isMatched ? 'green' : 'red' };
`;

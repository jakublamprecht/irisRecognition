import styled from 'styled-components';

export const MatchStatus = styled.span`
  color: ${props => props.isMatched ? 'green' : 'red' };
`;

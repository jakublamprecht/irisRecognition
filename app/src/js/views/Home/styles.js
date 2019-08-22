import styled from 'styled-components';
import { Icon } from 'antd';

export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 100px;
`;

export const HomeIcon = styled(Icon)`
  margin-bottom: 30px;
  font-size: 8rem;
`;

export const CardsWrapper = styled.div`
  padding-bottom: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

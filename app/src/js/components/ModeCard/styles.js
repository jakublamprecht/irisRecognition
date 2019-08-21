import styled from 'styled-components';
import { Icon } from 'antd';

export const CardIcon = styled(Icon)`
  padding-right: 5px;
  flex-basis: 100%;
  font-size: 32px;
  color: #40a9ff;
`;

export const CardModeName = styled.p`
  padding: 0;
  margin: 0;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bold;
  color: #595959;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  padding: 25px;
  margin: 20px;
  border: 1px solid #40a9ff;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #40a9ff;

    & ${CardIcon},
    & ${CardModeName} {
      color: white;
    }
  }
`;

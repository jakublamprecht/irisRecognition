import styled from 'styled-components';
import { Col, Tabs } from 'antd';

export const StyledTabs = styled(Tabs)`
  padding-top: 25px !important;

  .ant-tabs-content {
    padding-left: 0 !important;
  }
`;

export const Column = styled(Col)`
  height: 100%;
  background-color: #f0f2f5;
  padding: 15px 30px !important;

  &:first-child {
    padding-right: 15px !important;
  }

  &:last-child {
    padding-left: 15px !important;
  }
`;

export const Image = styled.img`
  width: 100%;
  margin-bottom: 10px;
`;

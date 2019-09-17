import styled from 'styled-components';
import { Card } from 'antd';

export const ResultCard = styled(Card)`
  width: 100%;
  padding-bottom: 30px !important;
  margin-bottom: 10px !important;

  .ant-card-body {
    padding-bottom: 0;
  }

  .ant-card-actions {
    position: absolute;
    bottom: 2px;
    width: 100%;
    background: none !important;
    border: none !important;

    > li {
      margin: 4px 0;
    }
  }
`;

export const ContentWrapper = styled.div`
  margin-top: 24px;
  border-top: 1px solid #e8e8e8;
`;

export const ResultCardTitle = styled.p`
  margin-bottom: 5px;
`;

export const FilePathText = styled.p`
  font-size: 14px;
  margin-bottom: 3px;
  color: #333333;
`;

export const CardTitleWrapper = styled.div`
  margin-bottom: 8px;
`;

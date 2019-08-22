import React from 'react';
import styled from 'styled-components';
import { Icon, Progress } from 'antd';

const ProcessingWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProcessingIcon = styled(Icon)`
  color: #40a9ff;
  font-size: 6rem;
  padding-bottom: 50px;
`;

const ProcessingProgress = styled(Progress)`
  padding-top: 30px !important;
  max-width: 50%;
`;

export const Processing = () => (
  <ProcessingWrapper>
    <ProcessingIcon type='loading'/>
    <p>Processing in progress:</p>
    <ProcessingProgress percent={30}/>
  </ProcessingWrapper>
);

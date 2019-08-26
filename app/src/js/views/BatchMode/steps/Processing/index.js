import React from 'react';
import {
  ProcessingIcon,
  ProcessingProgress,
  ProcessingWrapper,
} from './styles';

export const Processing = () => (
  <ProcessingWrapper>
    <ProcessingIcon type='loading'/>
    <p>Processing in progress:</p>
    <ProcessingProgress percent={30}/>
  </ProcessingWrapper>
);

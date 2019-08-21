import React from 'react';
import { CardWrapper, CardIcon, CardModeName } from './styles';

export const ModeCard = ({ modeName, iconName }) => {
  return (
    <CardWrapper>
      <CardIcon type={iconName} theme='filled'/>
      <CardModeName>{modeName}</CardModeName>
    </CardWrapper>
  )
};

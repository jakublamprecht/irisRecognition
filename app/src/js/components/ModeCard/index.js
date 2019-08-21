import React from 'react';
import { CardWrapper, CardIcon, CardModeName } from './styles';

export const ModeCard = ({ modeName, iconName, onClick }) => {
  return (
    <CardWrapper onClick={onClick}>
      <CardIcon type={iconName} theme='filled'/>
      <CardModeName>{modeName}</CardModeName>
    </CardWrapper>
  )
};

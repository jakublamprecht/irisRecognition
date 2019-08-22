import React, { useContext } from 'react';
import { HomeWrapper, HomeIcon, CardsWrapper } from './styles';
import { ModeCard } from '../../components/ModeCard';
import { ModeMachineContext } from '../../helpers/modeMachineContext';
import { MODE_TRANSITIONS } from '../../stateMachine/transitions';

export const Home = () => {
  const { transitionMode } = useContext(ModeMachineContext);

  return (
    <HomeWrapper>
      <HomeIcon type='eye' theme='filled'/>
      <h1 className='home-title'>Welcome to Iris Recognition app.</h1>
      <p>Choose the mode for the process:</p>
      <CardsWrapper>
        <ModeCard
          modeName='batch'
          iconName='thunderbolt'
          onClick={() => { transitionMode(MODE_TRANSITIONS.BATCH_MODE_SELECTED); }}/>
        <ModeCard
          modeName='step'
          iconName='build'
          onClick={() => { transitionMode(MODE_TRANSITIONS.STEP_MODE_SELECTED); }}/>
      </CardsWrapper>
    </HomeWrapper>
  );
};

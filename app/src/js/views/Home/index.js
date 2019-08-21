import React from 'react';
import { HomeWrapper, HomeIcon, CardsWrapper } from './styles';
import { ModeCard } from '../../components/ModeCard';
import { ModeMachineContext } from '../../helpers/modeMachineContext';
import * as TRANSITIONS from '../../stateMachine/transitions';

const Home = () => (
  <ModeMachineContext.Consumer>
    {({ transitionMode }) => (
      <HomeWrapper>
        <HomeIcon type='eye' theme='filled'/>
        <h1 className='home-title'>Welcome to Iris Recognition app.</h1>
        <p>Choose the mode for the process:</p>
        <CardsWrapper>
          <ModeCard
            modeName='step'
            iconName='build'
            onClick={() => { transitionMode(TRANSITIONS.STEP_MODE_SELECTED); }}/>
          <ModeCard
            modeName='batch'
            iconName='thunderbolt'
            onClick={() => { transitionMode(TRANSITIONS.BATCH_MODE_SELECTED); }}/>
        </CardsWrapper>
      </HomeWrapper>
    )}
  </ModeMachineContext.Consumer>
);

export default Home;

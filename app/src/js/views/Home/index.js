import React from 'react';
import { HomeWrapper, HomeIcon, CardsWrapper } from './styles';
import { ModeCard } from '../../components/ModeCard';
const Home = () => (
  <HomeWrapper>
    <HomeIcon type='eye' theme='filled'/>
    <h1 className='home-title'>Welcome to Iris Recognition app.</h1>
    <p>Choose the mode for the process:</p>
    <CardsWrapper>
      <ModeCard modeName='step' iconName='build'/>
      <ModeCard modeName='batch' iconName='thunderbolt'/>
    </CardsWrapper>
  </HomeWrapper>
);

export default Home;

import React from 'react';
import { connect } from 'react-redux';
import { Icon, Button } from 'antd';
import { goToModeSelection } from '../actions/transitionActions';

const mapDispatchToProps = (dispatch) => ({
  onStartClick: () => dispatch(goToModeSelection()),
});

const Home = ({ onStartClick }) => (
  <div className="home app-view">
    <Icon className="home-icon" type="eye" theme="filled"/>
    <p className="home-title">Welcome to Iris Recognition app.</p>
    <Button
      className="home-start"
      onClick={ onStartClick }
      type="primary"
      size="large">
      Click to start processing
      <Icon type="right-circle"/>
    </Button>
  </div>
);

export default connect(null, mapDispatchToProps)(Home);

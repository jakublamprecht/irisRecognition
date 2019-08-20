import React from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import { modes } from '../conf/modes.conf';

const renderItems = (modes, dispatch) => (
  Object.keys(modes).map(key => (
    <li key={ key }
      style={{
        width: `calc(100% / ${Object.keys(modes).length})`,
      }}
      className="modeList-item"
      onClick={ () => { dispatch(modes[key].transitionAction()); } }>
      <div>
        <Icon type={ modes[key].icon } theme="filled"/>
        { modes[key].name }
      </div>
    </li>
  ))
);

const ModeList = ({ dispatch }) => (
  <ul className="modeList">
    { renderItems(modes, dispatch) }
  </ul>
);

export default connect()(ModeList);

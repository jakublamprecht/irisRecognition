import React from 'react';

export const ModeMachineContext = React.createContext({
  currentModeState: undefined,
  transitionMode: () => {},
});

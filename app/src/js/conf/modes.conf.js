import { openStepMode, openBatchMode } from '../actions/transitionActions';

export const modes = {
  step: {
    name: "step",
    icon: "build",
    transitionAction: openStepMode,
  },
  batch: {
    name: "batch",
    icon: "thunderbolt",
    transitionAction: openBatchMode,
  },
};

import * as ACTION_TYPES from '../constants/actionTypes';
import { stepModeSteps } from '../conf/steps.conf';

const initialState = {
  currentStepId: null,
  currentStepFinished: null,
  selectedImage: null, // path to the file user selected
  currentImage: null, // TODO: Is this even needed?
  matchedImages: [],
  steps: {},
  stepsHistory: [],
};

export const stepModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.STEP_FLUSH_STATE:
      return { ...state, ...initialState };
    case ACTION_TYPES.STEP_MODE_INIT:
      return ({
        ...state,
        currentStepId: stepModeSteps[0].id,
        currentStepFinished: false,
      });
    case ACTION_TYPES.STEP_IMAGE_SELECTED:
      return { ...state, selectedImage: action.imagePath, currentImage: action.imagePath }
    case ACTION_TYPES.STEP_SET_CURRENT_IMAGE:
      return { ...state, currentImage: action.filePath };
    case ACTION_TYPES.STEP_REVERT_LAST_STEP: {
      const newStepsHistory = [...state.stepsHistory];
      const lastHistoryId = newStepsHistory.pop();
      const { [lastHistoryId]: undefined, ...newSteps } = state.steps;
      // for updating currentImage
      const lastNewHistoryIndex = newStepsHistory.length - 1;
      let newCurrentImage;

      if (lastNewHistoryIndex > 0) {
        const lastNewHistoryId = newStepsHistory[lastNewHistoryIndex];
        const lastNewSteps = newSteps[lastNewHistoryId];

        if (lastNewSteps.isMulti) {
          newCurrentImage = lastNewSteps.history[lastNewSteps.history.length - 1].image;
        } else {
          newCurrentImage = lastNewSteps.image;
        }
      } else {
        newCurrentImage = state.selectedImage;
      }

      return {
        ...state,
        steps: newSteps,
        stepsHistory: newStepsHistory,
        currentImage: newCurrentImage,
      }
    }
    case ACTION_TYPES.STEP_ADD_HISTORY_ENTRY: {
      const { stepId, isMulti, entry } = action;
      const currentStepsHistory = state.stepsHistory;
      const newStepsHistory = currentStepsHistory.includes(stepId) ? currentStepsHistory : [...currentStepsHistory, stepId];

      if (isMulti) {
        return ({
          ...state,
          steps: {
            ...state.steps,
            [stepId]: {
              ...state.steps[stepId],
              isMulti,
              history: [
                ...state.steps[stepId] ? state.steps[stepId].history : [],
                entry,
              ],
            },
          },
          stepsHistory: newStepsHistory,
        });
      } else {
        return ({
          ...state,
          steps: {
            ...state.steps,
            [stepId]: entry,
          },
          stepsHistory: newStepsHistory,
        });
      }
    }
    default:
      return state;
  }
};

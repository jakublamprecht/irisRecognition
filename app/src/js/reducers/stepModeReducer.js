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
    default:
      return state;
  }
};

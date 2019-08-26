// could possibly then be used with createSelector: getProperty = createSelector(getStepData, (data) => data.property)
export const getStepData = (stepId) => (state) => state.stepMode[stepId];

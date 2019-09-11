import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getBatchData } from '../../../../helpers/batchModeHelpers';
import { clearResults } from '../../../../actions/batchModeActions';
import { WizardStep } from '../../../../components/WizardStep';
import { MatchingResults } from '../../../../components/MatchingResults';

export const Results = (props) => {
  const dispatch = useDispatch;

  const { results } = useSelector(getBatchData) || {};

  const renderMatchingResults = () => (
    Object.values(results).map(({ processingImageData, matchingEntries }) => (
      <MatchingResults
        processingImageData={processingImageData}
        matchingEntries={matchingEntries}/>
    ))
  );

  const onPreviousTransition = () => {
    dispatch(clearResults());
  };

  return (
    <WizardStep {...props} onPreviousTransition={onPreviousTransition}>
      { renderMatchingResults() }
    </WizardStep>
  )
};

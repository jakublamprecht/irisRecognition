import React from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { downloadObjectAsJson } from '../../../../helpers/download';
import { getBatchData } from '../../../../helpers/batchModeHelpers';
import { clearResults } from '../../../../actions/batchModeActions';
import { WizardStep } from '../../../../components/WizardStep';
import { MatchingResults } from '../../../../components/MatchingResults';

export const Results = (props) => {
  const dispatch = useDispatch();

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

  const downloadAllResults = () => {
    downloadObjectAsJson(results, 'allResults');
  }

  return (
    <WizardStep {...props} onPreviousTransition={onPreviousTransition}>
      <Button type='primary' onClick={downloadAllResults}>Download all results</Button>
      { renderMatchingResults() }
    </WizardStep>
  )
};

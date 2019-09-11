import React, { useState } from 'react';

import { MatchingResult } from '../MatchingResult';
import { ResultsWrapper, ToggleButton, ToggleButtonContent, ToggleButtonIcon, ContentWrapper } from './styles';

// processingImageData - information about image that was tested/processed
// matchingEntries - array with info about images matched and results of matching
export const MatchingResults = ({ initiallyCollapsed, processingImageData, matchingEntries }) => {
  const [isCollapsed, setIsCollapsed] = useState(initiallyCollapsed || true);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderResults = () => (
    Object.values(matchingEntries).map(({ matchingImageData, matchingResults }) => (
      <MatchingResult
        processingImageData={processingImageData}
        matchingImageData={matchingImageData}
        matchingResults={matchingResults}/>
    ))
  );

  return (
    <ResultsWrapper>
      <ToggleButton onClick={toggleCollapsed}>
        <ToggleButtonContent>
          Matching results for: { processingImageData.imagePaths.originalImage }
        </ToggleButtonContent>
        <ToggleButtonIcon type={ isCollapsed ? 'down' : 'up' }/>
      </ToggleButton>
      {
        !isCollapsed &&
        <ContentWrapper>
          { renderResults() }
        </ContentWrapper>
      }
    </ResultsWrapper>
  )
};

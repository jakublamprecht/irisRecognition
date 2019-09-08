import React, { useState } from 'react';

import { MatchingResult } from '../MatchingResult';
import { ResultsWrapper, ToggleButton, ToggleButtonContent, ToggleButtonIcon, ContentWrapper } from './styles';

// imageData - information about image that was tested
// matchingData - information about images that were trying to be matched
export const MatchingResults = ({ initiallyCollapsed, imageData, matchingData }) => {
  const [isCollapsed, setIsCollapsed] = useState(initiallyCollapsed || true);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderResults = () => (
    matchingData.map((singleResultData) => (
      <MatchingResult imageData={imageData} matchingData={singleResultData}/>
    ))
  );

  return (
    <ResultsWrapper>
      <ToggleButton onClick={toggleCollapsed}>
        <ToggleButtonContent>
          Matching results for: { imageData.imagePaths.originalImage }
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

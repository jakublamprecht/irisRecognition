import React, { useState } from 'react';

import { MatchStatus } from './styles';
import { ResultsWrapper, ToggleButton, ToggleButtonContent, ToggleButtonIcon, ContentWrapper } from '../MatchingResults/styles';

// imageData - information about image that was tested
// matchingData - information about image matched
export const MatchingResult = ({ imageData, matchingData }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { isMatched } = matchingResults.isMatched;

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <ResultsWrapper>
      <ToggleButton onClick={toggleCollapsed}>
        <ToggleButtonContent>
          File path: { matchingData.imagePaths.originalImage }
          Match status: <MatchStatus isMatched={isMatched}>{ isMatched }</MatchStatus>
        </ToggleButtonContent>
        <ToggleButtonIcon type={ isCollapsed ? 'down' : 'up' }/>
      </ToggleButton>
      {
        !isCollapsed &&
        <ContentWrapper>
          Content
        </ContentWrapper>
      }
    </ResultsWrapper>
  )
};

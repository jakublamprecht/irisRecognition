import React, { useState } from 'react';

import { MatchStatus } from './styles';
import { ResultsWrapper, ToggleButton, ToggleButtonContent, ToggleButtonIcon, ContentWrapper } from '../MatchingResults/styles';

export const MatchingResult = ({ processingImageData, matchingImageData, matchingResults }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { isMatched } = matchingResults;

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <ResultsWrapper>
      <ToggleButton onClick={toggleCollapsed}>
        <ToggleButtonContent>
          File path: { matchingImageData.imagePaths.originalImage }
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

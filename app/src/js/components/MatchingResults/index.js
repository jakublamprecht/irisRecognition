import React, { useState } from 'react';
import { Avatar, Icon } from 'antd';

import { MatchingResult } from '../MatchingResult';
import { ResultCard, ContentWrapper, FilePathText, ResultCardTitle, CardTitleWrapper } from './styles';

const { Meta } = ResultCard;

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
    <ResultCard
      actions={[
        <span onClick={toggleCollapsed}>
          { isCollapsed ? 'Expand' : 'Collapse' }
          <Icon
            key='expand'
            style={{ fontSize: '10px', paddingLeft: '5px' }}
            type={ isCollapsed ? 'caret-down' : 'caret-up' } />
        </span>
      ]}>
      <Meta
        avatar={
          <Avatar
            shape='square'
            size={100}
            src={ processingImageData.imagePaths.originalImage }/>
        }
        title={
          <CardTitleWrapper>
            <ResultCardTitle>Results for:</ResultCardTitle>
            <FilePathText>{ processingImageData.imagePaths.originalImage}</FilePathText>
          </CardTitleWrapper>
        }
        description='Expand to see processing and matching resutls'
      />
      {
        // Change this to list!
        !isCollapsed &&
        <ContentWrapper>
          { renderResults() }
        </ContentWrapper>
      }
    </ResultCard>
  )
};

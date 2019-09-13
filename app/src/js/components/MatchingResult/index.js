import React, { useState } from 'react';
import { Avatar, Icon } from 'antd';

import { MatchStatus } from './styles';
import { ResultCard, ContentWrapper, FilePathText } from '../MatchingResults/styles';

const { Meta } = ResultCard;

export const MatchingResult = ({ processingImageData, matchingImageData, matchingResults }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { isMatched } = matchingResults;

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <ResultCard
      actions={[
        <span onClick={toggleCollapsed}>
          Show { isCollapsed ? 'more' : 'less' }
          <Icon
            key='more'
            style={{ fontSize: '10px', paddingLeft: '5px' }}
            type={ isCollapsed ? 'caret-down' : 'caret-up' } />
        </span>
      ]}>
      <Meta
        avatar={
          <Avatar
            shape='square'
            size={50}
            src={ matchingImageData.imagePaths.originalImage }/>
        }
        title={
          <div>
            <FilePathText>File: { matchingImageData.imagePaths.originalImage}</FilePathText>
            <FilePathText style={{ fontWeight: 'normal' }}>
              Match status: <MatchStatus isMatched={isMatched}>{ isMatched ? 'True' : 'False' }</MatchStatus>
            </FilePathText>
          </div>
        }
      />
      {
        !isCollapsed &&
        <ContentWrapper>
          Content
        </ContentWrapper>
      }
    </ResultCard>
  )
};

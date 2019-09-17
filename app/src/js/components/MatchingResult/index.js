import React from 'react';
import { Avatar, List } from 'antd';

import { MatchStatus } from './styles';
import { FilePathText } from '../MatchingResults/styles';

const { Item: ListItem } = List;
const { Meta: ListItemMeta } = ListItem;

export const MatchingResult = ({ matchingImageData, matchingResults, openPreviewModal }) => {
  const { isMatched } = matchingResults;
  const { originalImage } = matchingImageData.imagePaths;

  return (
    <ListItem
      key={`resultListItem${originalImage}`}
      extra={
        <a href="#" onClick={openPreviewModal.bind(null, originalImage)}>See more...</a>
      }>
      <ListItemMeta
        avatar={
          <Avatar
            shape='square'
            size={50}
            src={ originalImage }/>
        }
        title={
          <div>
            <FilePathText>File: { originalImage }</FilePathText>
            <FilePathText style={{ fontWeight: 'normal' }}>
              Match status: <MatchStatus isMatched={isMatched}>{ isMatched ? 'True' : 'False' }</MatchStatus>
            </FilePathText>
          </div>
        }
      />
    </ListItem>
  )
};

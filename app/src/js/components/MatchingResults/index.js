import React, { useState } from 'react';
import { Avatar, Icon, List, Modal } from 'antd';

import { MatchingResult } from '../MatchingResult';
import { MatchingResultPreview } from '../MatchingResultPreview';
import { ResultCard, ContentWrapper, FilePathText, ResultCardTitle, CardTitleWrapper } from './styles';

const { Meta } = ResultCard;

// processingImageData - information about image that was tested/processed
// matchingEntries - array with info about images matched and results of matching
export const MatchingResults = ({ noCollapseAction, processingImageData, matchingEntries }) => {
  const [isCollapsed, setIsCollapsed] = useState(noCollapseAction ? false : true);
  const [currentPreview, setCurrentPreview] = useState('');

  const { originalImage: processingImageOriginalPath } = processingImageData.imagePaths;

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const openPreviewModal = (matchingFilePath) => {
    setCurrentPreview(matchingFilePath);
  };

  const onPreviewClose = () => {
    setCurrentPreview('')
  };

  // Takes a single matchingEntry, which contains matchingImageData and matchingResults
  const renderMatchingResult = ({ matchingImageData, matchingResults }) => (
    <MatchingResult
      openPreviewModal={openPreviewModal}
      matchingImageData={matchingImageData}
      matchingResults={matchingResults}/>
  );

  const renderMatchingResultPreview = () => {
    const { matchingImageData, matchingResults } = matchingEntries[currentPreview];

    return (
      <MatchingResultPreview
        processingImageData={processingImageData}
        matchingImageData={matchingImageData}
        matchingResults={matchingResults}/>
    );
  };

  // extracted so that it can be hidden if results is not collapsable
  const cardActions = noCollapseAction
    ? []
    : [
      <span key='expand' onClick={toggleCollapsed}>
        { isCollapsed ? 'Expand' : 'Collapse' }
        <Icon
          style={{ fontSize: '10px', paddingLeft: '5px' }}
          type={ isCollapsed ? 'caret-down' : 'caret-up' } />
      </span>
    ];

  return (
    <ResultCard
      key={`resultList${processingImageOriginalPath}`}
      actions={cardActions}>
      <Meta
        avatar={
          <Avatar
            shape='square'
            size={100}
            src={ processingImageOriginalPath }/>
        }
        title={
          <CardTitleWrapper>
            <ResultCardTitle>Results for:</ResultCardTitle>
            <FilePathText>{ processingImageOriginalPath }</FilePathText>
          </CardTitleWrapper>
        }
        description={ noCollapseAction ? '' : 'Expand to see processing and matching resutls' }
      />
      {
        !isCollapsed &&
        <ContentWrapper>
          <List
            itemLayout='vertical'
            pagination={{
              pageSize: 10,
            }}
            dataSource={Object.values(matchingEntries)}
            renderItem={renderMatchingResult}>
          </List>
          <Modal
            width='96vw'
            style={{
              top: '2vh',
            }}
            title={
              <h3>Results preview:</h3>
            }
            visible={!!currentPreview}
            onCancel={onPreviewClose}
            footer={null}
            destroyOnClose={true}>
            { currentPreview && renderMatchingResultPreview() }
          </Modal>
        </ContentWrapper>
      }
    </ResultCard>
  )
};

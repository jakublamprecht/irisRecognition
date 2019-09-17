import React from 'react';
import { Row } from 'antd';
import { Column, Image, StyledTabs } from './styles';
import { SegmentationResults } from '../SegmentationResults';

const { TabPane } = StyledTabs;

const TabContent = ({ leftSideRender, rightSideRender }) => (
  <Row style={{ backgroundColor: '#f0f2f5' }}>
    <Column span={12}>
      <h4>Tested image:</h4>
      { leftSideRender }
    </Column>
    <Column span={12}>
      <h4>Matched image:</h4>
      { rightSideRender }
    </Column>
  </Row>
);

export const ProcessPreview = ({ processingImageData, matchingImageData }) => {
  const { imagePaths: processingPaths, segmentationResults: processingSegmResults } = processingImageData;
  const { imagePaths: matchingPaths, segmentationResults: matchingSegmResults } = matchingImageData;

  return (
    <StyledTabs tabPosition='left'>
      <TabPane
        key='original'
        tab='Original'
      >
        <TabContent
          leftSideRender={
            <Image src={processingPaths.originalImage}/>
          }
          rightSideRender={
            <Image src={matchingPaths.originalImage}/>
          }/>
      </TabPane>
      <TabPane
        key='preprocessing'
        tab='Preprocessing'
      >
        <TabContent
          leftSideRender={
            <Image src={processingPaths.preprocessingImages.slice(-1)}/>
          }
          rightSideRender={
            <Image src={matchingPaths.preprocessingImages.slice(-1)}/>
          }/>
      </TabPane>
      <TabPane
        key='segmentation'
        tab='Segmentation'
      >
        <TabContent
          leftSideRender={
            <>
              <Image src={processingPaths.imageMasked}/>
              <SegmentationResults {...processingSegmResults}/>
            </>
          }
          rightSideRender={
            <>
              <Image src={matchingPaths.imageMasked}/>
              <SegmentationResults {...matchingSegmResults}/>
            </>
          }/>
      </TabPane>
      <TabPane
        key='normalization'
        tab='Normalization'
      >
        <TabContent
          leftSideRender={
            <>
              <p>Normalized iris:</p>
              <Image src={processingPaths.normalizedImage}/>
              <p>Normalized mask:</p>
              <Image src={processingPaths.normalizedMask}/>
              <p>Normalized iris with mask:</p>
              <Image src={processingPaths.normalizedImageMasked}/>
            </>
          }
          rightSideRender={
            <>
              <p>Normalized iris:</p>
              <Image src={matchingPaths.normalizedImage}/>
              <p>Normalized mask:</p>
              <Image src={matchingPaths.normalizedMask}/>
              <p>Normalized iris with mask:</p>
              <Image src={matchingPaths.normalizedImageMasked}/>
            </>
          }/>
      </TabPane>
      <TabPane
        key='encoding'
        tab='Encoding'
      >
        <TabContent
          leftSideRender={
            <>
              <p>Iris template:</p>
              <Image src={processingPaths.irisTemplate}/>
              <p>Mask template:</p>
              <Image src={processingPaths.maskTemplate}/>
            </>
          }
          rightSideRender={
            <>
              <p>Iris template:</p>
              <Image src={matchingPaths.irisTemplate}/>
              <p>Mask template:</p>
              <Image src={matchingPaths.maskTemplate}/>
            </>
          }/>
      </TabPane>
    </StyledTabs>
  );
}

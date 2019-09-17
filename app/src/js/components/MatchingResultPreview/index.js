import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';

import { Column, MatchStatus } from './styles';
import { ProcessPreview } from '../ProcessPreview';
import { MatchingDataTable } from '../MatchingDataTable'

export const MatchingResultPreview = ({ processingImageData, matchingImageData, matchingResults }) => {
  const [isTableVisible, setTableVisible] = useState(false);
  const { isMatched, minDistanceValue } = matchingResults;
  const minDistanceValueIndex = matchingResults.hammingDistances.indexOf(matchingResults.minDistanceValue);

  return (
    <Row>
      <Row>
        <Col span={8}>
          <h3>Match status: <MatchStatus isMatched={isMatched}>{ isMatched ? 'True' : 'False' }</MatchStatus></h3>
          <h4>Minimum HD value: <b>{ minDistanceValue }</b></h4>
          <h4>Shift number for min HD value: { minDistanceValueIndex === 0 ? 0 : Math.ceil(minDistanceValueIndex/2) }</h4>
          <h4>Shift direction for min HD value: { minDistanceValueIndex === 0 ? '-' : minDistanceValueIndex % 2 ? 'Left' : 'Right' }</h4>
        </Col>
        <Col span={16}>
          <Button type='primary' onClick={() => setTableVisible(!isTableVisible)}>
            {`${isTableVisible ? 'Hide' : 'Show'} all values`}
          </Button>
          {
            isTableVisible &&
            <MatchingDataTable matchingResults={matchingResults}/>
          }
        </Col>
      </Row>
      <Row>
        <ProcessPreview
          processingImageData={processingImageData}
          matchingImageData={matchingImageData}/>
      </Row>
    </Row>
  )
};

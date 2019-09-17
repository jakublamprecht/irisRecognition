import React from 'react';
import { Row, Col } from 'antd';

export const SegmentationResults = ({ irisCenterX, irisCenterY, irisR, pupilCenterX, pupilCenterY, pupilR }) => {
  return (
    <Row>
      <Col span={12}>
        <p><b>Iris:</b></p>
        <p>Center x: <b>{ irisCenterX }</b></p>
        <p>Center y: <b>{ irisCenterY }</b></p>
        <p>Radius: <b>{ irisR }</b></p>
      </Col>

      <Col span={12}>
        <p><b>Pupil:</b></p>
        <p>Center x: <b>{ pupilCenterX }</b></p>
        <p>Center y: <b>{ pupilCenterY }</b></p>
        <p>Radius: <b>{ pupilR }</b></p>
      </Col>
    </Row>
  );
}

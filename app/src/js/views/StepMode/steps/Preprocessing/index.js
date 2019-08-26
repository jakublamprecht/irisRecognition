import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col } from 'antd';

import { getStepData } from '../../../../helpers/stepModeHelpers';
import { WizardStep } from '../../../../components/WizardStep';
import { ImagePreview } from '../../../../components/StepMode/ImagePreview';
import { MethodSelector } from '../../../../components/StepMode/MethodSelector';
import { METHOD_IDS, methodConfigs } from './methods';

export const Preprocessing = (props) => {
  const { stepId } = props;
  const dispatch = useDispatch();
  const preprocessingData = useSelector(getStepData(stepId));
  // The question is whether we need a local state to keep track or we can just keep everything in the redux
  // If we keep everything in the redux we won't know whether the processing happened
  // in this case i think redux should be the place where history data is kept (like params of already performed actions)
  // but shouldn't the defaults be within forms/components and they will be saved into the redux on confirmation? Then we don't need the local state i guess
  const [currentData, setCurrentData] = useState({
    method: '',
    methodParams: {},
  });

  const onMethodChange = () => {

  };

  return (
    <WizardStep {...props}>
      <Col span={10}>
        <ImagePreview/>
      </Col>
      <Col span={14}>
        <MethodSelector
          methods={methodConfigs}
          defaultMethod={METHOD_IDS.GAUSS}
          onMethodChange={onMethodChange}
        />
      </Col>
    </WizardStep>
  );
};

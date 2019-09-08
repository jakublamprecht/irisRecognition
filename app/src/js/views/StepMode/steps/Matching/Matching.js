import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Tabs } from 'antd';

import { STEP_STEPS } from '../../../../stateMachine/stateNames';
import { getStepData } from '../../../../helpers/stepModeHelpers';
import { WizardStep } from '../../../../components/WizardStep';
import { setStepData, clearStepData } from '../../../../actions/stepModeActions';
import { ButtonsWrapper, Column, PaddedColumn, MethodSwitcher } from '../../../../components/WizardStep/styles';

import { METHOD_IDS, methodConfigs } from './methods';
import { ImagePreview } from '../../../../components/StepMode/ImagePreview';

const { TabPane } = Tabs;

export const Matching = (props) => {
  const DEFAULT_METHOD = METHOD_IDS.HAMMING;
  const { stepId } = props;
  const dispatch = useDispatch();

  const lastSavedData = useSelector(getStepData(stepId));
  const { imageTemplate, maskTemplate } = useSelector(getStepData(STEP_STEPS.ENCODING)).results;

  const defaultData = {
    method: DEFAULT_METHOD,
    methodParams: {},
  };

  const initialData = {
    method: lastSavedData.method || defaultData.method,
    methodParams: lastSavedData.methodParams || defaultData.methodParams,
  };

  const [data, setData] = useState(initialData);

  const onMethodChange = (methodId) => {
    setData({
      ...data,
      method: methodId,
      methodParams: {},
    });
  };

  const onParamsChange = (newParams) => {
    setData({
      ...data,
      methodParams: newParams,
    });
  };

  const onNextTransition = () => {
    dispatch(setStepData(stepId, data));
  };

  const onPreviousTransition = () => {
    dispatch(clearStepData(stepId));
  };

  return (
    <WizardStep
      {...props}
      onNextTransition={onNextTransition}
      onPreviousTransition={onPreviousTransition}>
      <PaddedColumn span={10}>
        <Tabs defaultActiveKey='image'>
          <TabPane tab='Image template' key='imageTemplate'>
            <ImagePreview srcImage={imageTemplate}/>
          </TabPane>
          <TabPane tab='Mask template' key='maskTemplate'>
            <ImagePreview srcImage={maskTemplate}/>
          </TabPane>
        </Tabs>
      </PaddedColumn>
      <Column span={14}>
        <MethodSwitcher
          selectorTitle='Select matching method:'
          methods={methodConfigs}
          methodData={data}
          onMethodChange={onMethodChange}
          onParamsChange={onParamsChange}
        />
        <ButtonsWrapper>
          <p>Click 'next' to start matching process.</p>
        </ButtonsWrapper>
      </Column>
    </WizardStep>
  );
};

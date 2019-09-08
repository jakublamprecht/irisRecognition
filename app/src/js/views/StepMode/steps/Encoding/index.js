import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Spin, Tabs, Tooltip } from 'antd';

import { STEP_STEPS } from '../../../../stateMachine/stateNames';
import { getStepData, isEmptyObject } from '../../../../helpers/stepModeHelpers';
import { WizardStep } from '../../../../components/WizardStep';
import { setStepData, clearStepData } from '../../../../actions/stepModeActions';
import { ButtonsWrapper, ActionButton, Column, PaddedColumn, MethodSwitcher } from '../../../../components/WizardStep/styles';

import { METHOD_IDS, methodConfigs } from './methods';
import { ImagePreview } from '../../../../components/StepMode/ImagePreview';

const { TabPane } = Tabs;

export const Encoding = (props) => {
  const DEFAULT_METHOD = METHOD_IDS.LOG_GABOR;
  const { stepId } = props;
  const dispatch = useDispatch();

  const lastSavedData = useSelector(getStepData(stepId));
  const { normalizedImage, normalizedMask } = useSelector(getStepData(STEP_STEPS.NORMALIZATION));

  const defaultData = {
    method: DEFAULT_METHOD,
    methodParams: {},
    results: {},
  };

  const initialData = {
    method: lastSavedData.method || defaultData.method,
    methodParams: lastSavedData.methodParams || defaultData.methodParams,
    results: lastSavedData.results || defaultData.results,
  };

  const [data, setData] = useState(initialData);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentMethodHandler = methodConfigs[data.method].handler || function(){};

  const beforeEncodingGuard = () => {
    const canTransition = !isEmptyObject(data.results);
    const description = canTransition ? 'Success' : 'Encode the images before transitioning';

    return {
      canTransition,
      description,
    };
  };

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

  const revertProcess = () => {
    setData(defaultData);
    dispatch(setStepData(stepId, defaultData));
  };

  const addProcess = () => {
    setIsProcessing(true);

    // Passes all data from params and segmentation results, which are then extracted by destructing on API call level
    return currentMethodHandler(normalizedImage, normalizedMask, data.methodParams)
      .then((response) => {
        const { data: results } = response;

        const newData = {
          ...data,
          results
        };

        setData(newData);
        dispatch(setStepData(stepId, newData));
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  const onPreviousTransition = () => {
    dispatch(clearStepData(stepId));
  };

  return (
    <WizardStep
      {...props}
      onPreviousTransition={onPreviousTransition}
      nextTransitionGuard={beforeEncodingGuard}
      transitionsDisabled={isProcessing}>
      <PaddedColumn span={10}>
        <Spin size='large' spinning={isProcessing}>
          <Tabs defaultActiveKey='image'>
            <TabPane tab='Image' key='image'>
              <ImagePreview srcImage={normalizedImage}/>
              {
                data.results.imageTemplate &&
                <ImagePreview srcImage={data.results.imageTemplate}/>
              }
            </TabPane>
            <TabPane tab='Mask' key='mask'>
              <ImagePreview srcImage={normalizedMask}/>
              {
                data.results.maskTemplate &&
                <ImagePreview srcImage={data.results.maskTemplate}/>
              }
            </TabPane>
          </Tabs>
        </Spin>
      </PaddedColumn>
      <Column span={14}>
        <MethodSwitcher
          selectorTitle='Select encoding method:'
          methods={methodConfigs}
          methodData={data}
          onMethodChange={onMethodChange}
          onParamsChange={onParamsChange}
        />
        <ButtonsWrapper>
          {
            !isEmptyObject(data.results) &&
            <ActionButton onClick={revertProcess} disabled={isProcessing}>
              Reset <Icon type='rollback'/>
            </ActionButton>
          }
          <Tooltip placement='topRight' title='This will override previous encoding process.'>
            <ActionButton type='primary' onClick={addProcess} disabled={isProcessing}>
              Process <Icon type='plus'/>
            </ActionButton>
          </Tooltip>
        </ButtonsWrapper>
      </Column>
    </WizardStep>
  );
};

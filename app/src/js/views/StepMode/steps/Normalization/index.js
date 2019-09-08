import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Spin, Tabs, Tooltip } from 'antd';

import { STEP_STEPS } from '../../../../stateMachine/stateNames';
import { getStepData, getWorkingImage, isEmptyObject } from '../../../../helpers/stepModeHelpers';
import { WizardStep } from '../../../../components/WizardStep';
import { setStepData, clearStepData } from '../../../../actions/stepModeActions';
import { ButtonsWrapper, ActionButton, Column, PaddedColumn, MethodSwitcher } from '../../../../components/WizardStep/styles';

import { METHOD_IDS, methodConfigs } from './methods';
import { ImagePreview } from '../../../../components/StepMode/ImagePreview';

const { TabPane } = Tabs;

export const Normalization = (props) => {
  const DEFAULT_METHOD = METHOD_IDS.DAUGMAN;
  const { stepId } = props;
  const dispatch = useDispatch();

  const lastSavedData = useSelector(getStepData(stepId));
  const { mask, imageMasked, results: segmentationResults } = useSelector(getStepData(STEP_STEPS.SEGMENTATION));
  const workingImage = useSelector(getWorkingImage);

  const defaultData = {
    method: DEFAULT_METHOD,
    methodParams: {},
    normalizedImage: '',
    normalizedMask: '',
    normalizedImageMasked: '',
  };

  const initialData = {
    method: lastSavedData.method || defaultData.method,
    methodParams: lastSavedData.methodParams || defaultData.methodParams,
    normalizedImage: lastSavedData.normalizedImage || defaultData.normalizedImage,
    normalizedMask: lastSavedData.normalizedMask || defaultData.normalizedMask,
    normalizedImageMasked: lastSavedData.normalizedImageMasked || defaultData.normalizedImageMasked,
  };

  const [data, setData] = useState(initialData);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentMethodHandler = methodConfigs[data.method].handler || function(){};

  const beforeNormalizationGuard = () => {
    const canTransition = data.normalizedImage && data.normalizedMask;
    const description = canTransition ? 'Success' : 'Normalize the images before transitioning';

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
    return currentMethodHandler(workingImage, mask, { ...segmentationResults, ...data.methodParams })
      .then((response) => {
        const { data: { normalizedImage, normalizedMask, normalizedImageMasked} } = response;

        const newData = {
          ...data,
          normalizedImage,
          normalizedMask,
          normalizedImageMasked,
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
      nextTransitionGuard={beforeNormalizationGuard}
      transitionsDisabled={isProcessing}>
      <PaddedColumn span={10}>
        <Spin size='large' spinning={isProcessing}>
          <Tabs defaultActiveKey='image'>
            <TabPane tab='Image' key='image'>
              <ImagePreview srcImage={workingImage}/>
              {
                data.normalizedImage &&
                <ImagePreview srcImage={data.normalizedImage}/>
              }
            </TabPane>
            <TabPane tab='Mask' key='mask'>
              <ImagePreview srcImage={mask}/>
              {
                data.normalizedMask &&
                <ImagePreview srcImage={data.normalizedMask}/>
              }
            </TabPane>
            <TabPane tab='Mask Preview' key='maskPrev'>
              <ImagePreview srcImage={imageMasked}/>
              {
                data.normalizedImageMasked &&
                <ImagePreview srcImage={data.normalizedImageMasked}/>
              }
            </TabPane>
          </Tabs>
        </Spin>
      </PaddedColumn>
      <Column span={14}>
        <MethodSwitcher
          selectorTitle='Select normalization method:'
          methods={methodConfigs}
          methodData={data}
          onMethodChange={onMethodChange}
          onParamsChange={onParamsChange}
        />
        <ButtonsWrapper>
          {
            data.normalizedImage && data.normalizedImageMasked &&
            <ActionButton onClick={revertProcess} disabled={isProcessing}>
              Reset <Icon type='rollback'/>
            </ActionButton>
          }
          <Tooltip placement='topRight' title='This will override previous normalization process.'>
            <ActionButton type='primary' onClick={addProcess} disabled={isProcessing}>
              Process <Icon type='plus'/>
            </ActionButton>
          </Tooltip>
        </ButtonsWrapper>
      </Column>
    </WizardStep>
  );
};

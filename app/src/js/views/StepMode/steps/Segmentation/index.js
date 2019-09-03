import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Tooltip } from 'antd';

import { getStepData } from '../../../../helpers/stepModeHelpers';
import { STEP_STEPS } from '../../../../stateMachine/stateNames';
import { WizardStep } from '../../../../components/WizardStep';
import { ImagePreview } from '../../../../components/StepMode/ImagePreview';
import { ButtonsWrapper, ActionButton, Column, MethodSwitcher } from '../../../../components/WizardStep/styles';
import { setStepData, clearStepData } from '../../../../actions/stepModeActions';
import { METHOD_IDS, methodConfigs } from './methods';

export const Segmentation = (props) => {
  const DEFAULT_METHOD = METHOD_IDS.HOUGH;
  const { stepId } = props;
  const dispatch = useDispatch();
  const segmentationSavedData = useSelector(getStepData(stepId)) || {};

  const lastSavedPreprocessing = useSelector(getStepData(STEP_STEPS.PREPROCESSING)).slice(-1)[0] || {}
  const lastSavedImage = lastSavedPreprocessing.image || useSelector(getStepData(STEP_STEPS.IMAGE_SELECTION)).proxyImage;

  const defaultData = {
    method: DEFAULT_METHOD,
    methodParams: {},
    image: lastSavedImage,
    // should result data be kept here also? or just in redux somwhere else?
    // If only in redux in a separate place, then what about onPreviousTransition
    // Maybe something like "stepData" and "resultData" in redux and they would have a key for each of the steps
  };

  const initialData = {
    method: segmentationSavedData.method || defaultData.method,
    methodParams: segmentationSavedData.methodParams || defaultData.methodParams,
    image: segmentationSavedData.image || defaultData.image,
  };

  const [data, setData] = useState(initialData);
  const currentMethodHandler = methodConfigs[data.method].handler || function(){};

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

  const revertLastProcess = () => {
    setData(defaultData);
    dispatch(setStepData(stepId, defaultData));
  };

  const addNewProcess = () => {
    return currentMethodHandler(data.image, data.methodParams)
      .then((response) => {
        const { processedImage } = response.data;
        const newCurrentData = {
          ...data,
          image: processedImage,
        };

        setData(newCurrentData);
        dispatch(setStepData(stepId, newCurrentData));
      });
  };

  const onPreviousTransition = () => {
    dispatch(clearStepData(stepId));
  };

  return (
    <WizardStep {...props} onPreviousTransition={onPreviousTransition}>
      <Column span={10}>
        <ImagePreview srcImage={data.image}/>
      </Column>
      <Column span={14}>
        <MethodSwitcher
          selectorTitle='Select segmentation method:'
          methods={methodConfigs}
          methodData={data}
          onMethodChange={onMethodChange}
          onParamsChange={onParamsChange}
        />
        <ButtonsWrapper>
          {
            segmentationSavedData.method &&
            <ActionButton onClick={revertLastProcess}>
              Reset <Icon type='rollback'/>
            </ActionButton>
          }
          <Tooltip placement='topRight' title='This will override previous segmentation process.'>
            <ActionButton type='primary' onClick={addNewProcess}>
              Process <Icon type='plus'/>
            </ActionButton>
          </Tooltip>
        </ButtonsWrapper>
      </Column>
    </WizardStep>
  );
};

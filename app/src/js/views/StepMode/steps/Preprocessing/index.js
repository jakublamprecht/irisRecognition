import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'antd';

import { STEP_STEPS } from '../../../../stateMachine/stateNames';
import { getStepData } from '../../../../helpers/stepModeHelpers';
import { WizardStep } from '../../../../components/WizardStep';
import { ImagePreview } from '../../../../components/StepMode/ImagePreview';
import { setStepData, clearStepData } from '../../../../actions/stepModeActions';
import { METHOD_IDS, methodConfigs } from './methods';
import { ButtonsWrapper, ActionButton, Column, MethodSwitcher } from './styles';

export const Preprocessing = (props) => {
  const DEFAULT_METHOD = METHOD_IDS.GAUSS;
  const { stepId } = props;
  const dispatch = useDispatch();
  const preprocessingSavedData = useSelector(getStepData(stepId));
  const lastSavedData = preprocessingSavedData.slice(-1)[0] || {};

  const { proxyImage } = useSelector((state) => state.stepMode[STEP_STEPS.IMAGE_SELECTION]);

  const defaultData = {
    method: DEFAULT_METHOD,
    methodParams: {},
    image: proxyImage,
  };

  const initialData = {
    method: lastSavedData.method || defaultData.method,
    methodParams: lastSavedData.methodParams || defaultData.methodParams,
    image: lastSavedData.image || defaultData.image,
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
    const newSavedData = preprocessingSavedData.slice(0, -1);
    const newLastSavedData = newSavedData.slice(-1)[0] || defaultData;

    dispatch(setStepData(stepId, newSavedData));
    setData(newLastSavedData);
  };

  const addNewProcess = () => {
    return currentMethodHandler(data.image, data.methodParams)
      .then((response) => {
        const { processedImage } = response.data;
        const newCurrentData = {
          ...data,
          image: processedImage,
        };
        const newSavedData = [...preprocessingSavedData, newCurrentData];

        setData(newCurrentData);
        dispatch(setStepData(stepId, newSavedData));
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
          selectorTitle='Select preprocessing method:'
          methods={methodConfigs}
          methodData={data}
          onMethodChange={onMethodChange}
          onParamsChange={onParamsChange}
        />
        <ButtonsWrapper>
          {
            lastSavedData.method &&
            <ActionButton onClick={revertLastProcess}>
              Revert last <Icon type='rollback'/>
            </ActionButton>
          }
          <ActionButton type='primary' onClick={addNewProcess}>
            Add new <Icon type='plus'/>
          </ActionButton>
        </ButtonsWrapper>
      </Column>
    </WizardStep>
  );
};

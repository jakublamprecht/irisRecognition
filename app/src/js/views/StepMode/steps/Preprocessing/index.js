import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'antd';

import { getStepData } from '../../../../helpers/stepModeHelpers';
import { WizardStep } from '../../../../components/WizardStep';
import { ImagePreview } from '../../../../components/StepMode/ImagePreview';
import { setStepData } from '../../../../actions/stepModeActions';
import { METHOD_IDS, methodConfigs } from './methods';
import { ButtonsWrapper, ActionButton, Column, MethodSwitcher } from './styles';

export const Preprocessing = (props) => {
  const DEFAULT_METHOD = METHOD_IDS.GAUSS;
  const { stepId } = props;
  const dispatch = useDispatch();
  const preprocessingSavedData = useSelector(getStepData(stepId));
  const lastSavedData = preprocessingSavedData.slice(-1)[0] || {};

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
      method: methodId,
      methodParams: {},
    });
  };

  const onParamsChange = (newParams) => {
    setData({
      method: data.method,
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
    const newSavedData = [...preprocessingSavedData, data];

    dispatch(setStepData(stepId, newSavedData));
  };

  return (
    <WizardStep {...props}>
      <Column span={10}>
        <ImagePreview/>
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

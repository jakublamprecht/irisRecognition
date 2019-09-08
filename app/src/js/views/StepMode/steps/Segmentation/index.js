import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Tooltip, Tabs, Spin } from 'antd';
import { Title, Wrapper, MethodSelect } from './styles';

const { Option } = MethodSelect;
const { TabPane } = Tabs;

import { segmentation } from '../../../../api';
import { getStepData, isEmptyObject, getWorkingImage } from '../../../../helpers/stepModeHelpers';
import { WizardStep } from '../../../../components/WizardStep';
import { ImagePreview } from '../../../../components/StepMode/ImagePreview';
import { ButtonsWrapper, ActionButton, Column, PaddedColumn } from '../../../../components/WizardStep/styles';
import { setStepData, clearStepData } from '../../../../actions/stepModeActions';
import { SEGM_METHOD_IDS, NOISE_METHOD_IDS, segmentationMethodConfigs, noiseMethodConfigs } from './methods';

export const Segmentation = (props) => {
  const SEGM_DEFAULT_METHOD = SEGM_METHOD_IDS.DAUGMAN;
  const NOISE_DEFAULT_METHOD = NOISE_METHOD_IDS.PARABOLIC_APPROXIMATION;

  const { stepId } = props;
  const dispatch = useDispatch();
  const segmentationSavedData = useSelector(getStepData(stepId)) || {};

  const lastSavedImage = useSelector(getWorkingImage);

  const defaultData = {
    image: lastSavedImage,
    mask: '',
    imageMasked: '',
    segmentationMethod: SEGM_DEFAULT_METHOD,
    noiseMethod: NOISE_DEFAULT_METHOD,
    results: {},
  };

  const initialData = {
    image: segmentationSavedData.image || defaultData.image,
    mask: segmentationSavedData.mask || defaultData.mask,
    imageMasked: segmentationSavedData.imageMasked || defaultData.imageMasked,
    segmentationMethod: segmentationSavedData.segmentationMethod || defaultData.segmentationMethod,
    noiseMethod: segmentationSavedData.noiseMethod || defaultData.noiseMethod,
    results: segmentationSavedData.results || defaultData.results,
  };

  const [data, setData] = useState(initialData);
  const [isProcessing, setIsProcessing] = useState(false);

  const setSegmentationMethod = (method) => {
    setData({
      ...data,
      segmentationMethod: method,
    });
  };

  const setNoiseMethod = (method) => {
    setData({
      ...data,
      noiseMethod: method,
    });
  };

  const renderMethodOptions = (methodConfigs) => (
    Object.entries(methodConfigs).map(([methodId, methodData]) => (
      <Option key={methodId} value={methodId}>{methodData.title}</Option>
    ))
  );

  const revertProcess = () => {
    setData(defaultData);
    dispatch(setStepData(stepId, defaultData));
  };

  const addProcess = () => {
    setIsProcessing(true);

    return segmentation(data.image, data.segmentationMethod, data.noiseMethod).then((response) => {
      const { workingImage, mask, imageMasked, ...results } = response.data;

      const newData = {
        ...data,
        mask,
        imageMasked,
        results,
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
    <WizardStep {...props} onPreviousTransition={onPreviousTransition} transitionsDisabled={isProcessing}>
      <PaddedColumn span={10}>
        <Spin size='large' spinning={isProcessing}>
          <Tabs defaultActiveKey='image'>
            <TabPane tab='Image' key='image'>
              <ImagePreview srcImage={data.image}/>
            </TabPane>
            <TabPane tab='Mask' key='mask'>
              <ImagePreview srcImage={data.mask}/>
            </TabPane>
            <TabPane tab='Mask Preview' key='maskPrev'>
              <ImagePreview srcImage={data.imageMasked}/>
            </TabPane>
          </Tabs>
        </Spin>
      </PaddedColumn>
      <Column span={14}>
        <Wrapper>
          <Title>Select segmentation method:</Title>
          <MethodSelect
            value={data.segmentationMethod}
            onChange={setSegmentationMethod}>
            {
              renderMethodOptions(segmentationMethodConfigs)
            }
          </MethodSelect>
          <Title>Select noise removal method:</Title>
          <MethodSelect
            value={data.noiseMethod}
            onChange={setNoiseMethod}>
            {
              renderMethodOptions(noiseMethodConfigs)
            }
          </MethodSelect>
        </Wrapper>
        <ButtonsWrapper>
          {
            !isEmptyObject(data.results) &&
            <ActionButton onClick={revertProcess} disabled={isProcessing}>
              Reset <Icon type='rollback'/>
            </ActionButton>
          }
          <Tooltip placement='topRight' title='This will override previous segmentation process.'>
            <ActionButton type='primary' onClick={addProcess} disabled={isProcessing}>
              Process <Icon type='plus'/>
            </ActionButton>
          </Tooltip>
        </ButtonsWrapper>
      </Column>
    </WizardStep>
  );
};

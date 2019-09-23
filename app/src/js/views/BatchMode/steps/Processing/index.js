import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';

import { isEmptyObject } from '../../../../helpers/stepModeHelpers';
import { setResults } from '../../../../actions/batchModeActions';
import { performBatchMatching } from '../../../../api';
import { WIZARD_TRANSITIONS } from '../../../../stateMachine/transitions';
import { ModeMachineContext } from '../../../../helpers/modeMachineContext';
import { getBatchData } from '../../../../helpers/batchModeHelpers';
import { fileTofilePath } from '../../../../helpers/antdHelpers';

import {
  ProcessingIcon,
  ProcessingWrapper,
} from './styles';

export const Processing = () => {
  const dispatch = useDispatch();
  const { transitionMode } = useContext(ModeMachineContext);
  const batchData = useSelector(getBatchData);

  const processingImages = batchData.processingImages.map(fileTofilePath);
  const matchingImages = batchData.matchingImages.map(fileTofilePath);
  const { configFile: processConfigFilePath } = batchData;

  if (isEmptyObject(batchData.results)) {
    performBatchMatching(processingImages, matchingImages, processConfigFilePath)
    .then((response) => {
      const { data: results } = response;

      dispatch(setResults(results))
      transitionMode(WIZARD_TRANSITIONS.PROCESSING_FINISHED);
    })
    .catch((err) => {
      notification.error({
        message: 'Processing failed, please try again.',
        placement: 'bottomLeft',
        duration: 3,
        // description: from error
      });

      transitionMode(WIZARD_TRANSITIONS.PROCESSING_FAILED);
    });
  }

  return (
    <ProcessingWrapper>
      <ProcessingIcon type='loading'/>
      <p>Processing in progress...</p>
    </ProcessingWrapper>
  );
};

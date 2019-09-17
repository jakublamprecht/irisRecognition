import React, { useContext } from 'react';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { performStepMatching } from '../../../../api';
import { ModeMachineContext } from '../../../../helpers/modeMachineContext';
import { STEP_STEPS } from '../../../../stateMachine/stateNames';
import { WIZARD_TRANSITIONS } from '../../../../stateMachine/transitions';
import { getStepData } from '../../../../helpers/stepModeHelpers';
import { fileTofilePath } from '../../../../helpers/antdHelpers';
import { setStepData } from '../../../../actions/stepModeActions';

import { MatchingProcessingWrapper, ProcessingIcon } from './styles';

export const MatchingProcessing = (props) => {
  const { stepId } = props;
  const dispatch = useDispatch();
  const { transitionMode } = useContext(ModeMachineContext);

  const { imageTemplate, maskTemplate } = useSelector(getStepData(STEP_STEPS.ENCODING)).results;
  const { matchingImages } = useSelector(getStepData(STEP_STEPS.MATCHING_IMAGE_SELECTION));

  const getMethodAndParamsFromEntry = (entry) => {
    const { method, methodParams } = entry;

    return { method, methodParams };
  };

  const generateProcessingImageData = () => {
    const { selectedImage: originalImage } = useSelector(getStepData(STEP_STEPS.IMAGE_SELECTION));
    const { mask, imageMasked, results: segmentationResults } = useSelector(getStepData(STEP_STEPS.SEGMENTATION));
    const { normalizedImage, normalizedMask, normalizedImageMasked } = useSelector(getStepData(STEP_STEPS.NORMALIZATION));
    const { results: { imageTemplate: irisTemplate, maskTemplate } } = useSelector(getStepData(STEP_STEPS.ENCODING));

    const preprocessingImages = useSelector(getStepData(STEP_STEPS.PREPROCESSING)).map((entry) => entry.image);

    const uploadedImageData = {
      imagePaths: {
        originalImage,
        preprocessingImages,
        mask,
        imageMasked,
        normalizedImage,
        normalizedMask,
        normalizedImageMasked,
        irisTemplate,
        maskTemplate,
      },
      segmentationResults,
    };

    return uploadedImageData;
  };

  const generateProcessConfig = () => {
    const preprocessingData = useSelector(getStepData(STEP_STEPS.PREPROCESSING));

    const preprocessingParams = preprocessingData.map(getMethodAndParamsFromEntry);
    const normalizationParams = getMethodAndParamsFromEntry(useSelector(getStepData(STEP_STEPS.NORMALIZATION)));
    const encodingParams = getMethodAndParamsFromEntry(useSelector(getStepData(STEP_STEPS.ENCODING)));
    const matchingParams = getMethodAndParamsFromEntry(useSelector(getStepData(STEP_STEPS.MATCHING)));

    const { segmentationMethod, noiseMethod } = useSelector(getStepData(STEP_STEPS.SEGMENTATION));
    const segmentationParams = { segmentationMethod, noiseMethod };

    return {
      [STEP_STEPS.PREPROCESSING]: preprocessingParams,
      [STEP_STEPS.SEGMENTATION]: segmentationParams,
      [STEP_STEPS.NORMALIZATION]: normalizationParams,
      [STEP_STEPS.ENCODING]: encodingParams,
      [STEP_STEPS.MATCHING]: matchingParams,
    };
  }

  const processingImageData = generateProcessingImageData();
  const processConfig = generateProcessConfig();

  const startProcessing = () => {
    const matchingImagesPaths = matchingImages.map(fileTofilePath);

    // Passes all data from params and segmentation results, which are then extracted by destructing on API call level
    return performStepMatching(imageTemplate, maskTemplate, matchingImagesPaths, processConfig)
      .then((response) => {
        const { data: matchingEntries } = response;
        const results = {
          'imageData': processingImageData,
          matchingEntries,
        }

        dispatch(setStepData(stepId, processConfig));
        dispatch(setStepData(STEP_STEPS.RESULTS_PREVIEW, results));

        transitionMode(WIZARD_TRANSITIONS.PROCESSING_FINISHED);
      })
      .catch(() => {
        notification.error({
          message: 'Matching failed, please try again.',
          placement: 'bottomLeft',
          duration: 3,
        });

        transitionMode(WIZARD_TRANSITIONS.PROCESSING_FAILED);
      });
  };

  startProcessing();

  return (
    <MatchingProcessingWrapper>
      <ProcessingIcon type='loading'/>
      <p>Matching in progress</p>
    </MatchingProcessingWrapper>
  );
};

import React from 'react';
import { Button, Icon, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { getStepData } from '../../../../helpers/stepModeHelpers';
import { clearStepData } from '../../../../actions/stepModeActions';
import { STEP_STEPS } from '../../../../stateMachine/stateNames';
import { WizardStep } from '../../../../components/WizardStep';
import { MatchingResults } from '../../../../components/MatchingResults';

export const Results = (props) => {
  const { stepId } = props;
  const dispatch = useDispatch;

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
  }

  const processConfig = useSelector(getStepData(STEP_STEPS.PROCESSING));
  const matchingEntries = useSelector(getStepData(stepId));

  const saveProcessConfig = () => {
    const a = document.createElement("a");
    const processConfigJson = JSON.stringify(processConfig);
    const blob = new Blob([processConfigJson], {
      type: 'octet/stream',
    });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'processConfig'
    a.style = "display: none";
    document.body.appendChild(a);

    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };

  const onPreviousTransition = () => {
    dispatch(clearStepData(stepId));
  };

  return (
    <WizardStep {...props} onPreviousTransition={onPreviousTransition}>
      <Tooltip placement='bottom' title='Save process config file to use it later in Batch mode.'>
        <Button type='primary' onClick={saveProcessConfig}>
          Download process config file <Icon type='download'/>
        </Button>
      </Tooltip>
      <MatchingResults
        processingImageData={uploadedImageData}
        matchingEntries={matchingEntries}
        initiallyCollapsed={false}/>
    </WizardStep>
  )
};

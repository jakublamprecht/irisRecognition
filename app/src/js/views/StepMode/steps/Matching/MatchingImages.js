import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStepData } from '../../../../helpers/stepModeHelpers';
import { WizardStep } from '../../../../components/WizardStep';
import { MultipleUpload } from '../../../../components/Upload/MultipleUpload';
import { setStepData, clearStepData } from '../../../../actions/stepModeActions';

export const MatchingImagesSelection = (props) => {
  const { stepId } = props;
  const dispatch = useDispatch();
  const matchingImages = useSelector(getStepData(stepId)).matchingImages || [];

  const onFilesChange = ({ fileList }) => (
    dispatch(setStepData(stepId, {
      matchingImages: fileList,
    }))
  );

  const onPreviousTransition = () => (
    dispatch(clearStepData(stepId))
  );

  const areFilesSelected = () => {
    const canTransition = matchingImages.length > 0;
    const description = canTransition ? 'Success' : 'At least one image has to be selected';

    return {
      canTransition,
      description,
    };
  }

  return (
    <WizardStep
      {...props}
      onPreviousTransition={onPreviousTransition}
      nextTransitionGuard={areFilesSelected}>
      <MultipleUpload
        fileList={matchingImages}
        onFilesChange={onFilesChange}
        buttonLabel='Select Images for Matching'/>
    </WizardStep>
  );
};

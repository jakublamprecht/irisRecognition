import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WizardStep } from '../../../../components/WizardStep';
import { MultipleUpload } from '../../../../components/Upload/MultipleUpload';
import { setMatchingImages, clearMatchingImages } from '../../../../actions/batchModeActions';

export const MatchingImagesSelection = (props) => {
  const dispatch = useDispatch();
  const matchingImages = useSelector((state) => state.batchMode.matchingImages);

  const onFilesChange = ({ fileList }) => (
    dispatch(setMatchingImages(fileList))
  );

  const onPreviousTransition = () => (
    dispatch(clearMatchingImages())
  );

  return (
    <WizardStep {...props} onPreviousTransition={onPreviousTransition}>
      <MultipleUpload
        fileList={matchingImages}
        onFilesChange={onFilesChange}
        buttonLabel='Select Images for Matching'/>
    </WizardStep>
  );
};

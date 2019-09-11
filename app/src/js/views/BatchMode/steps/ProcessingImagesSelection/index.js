import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WizardStep } from '../../../../components/WizardStep';
import { MultipleUpload } from '../../../../components/Upload/MultipleUpload';
import { setProcessingImages } from '../../../../actions/batchModeActions';

export const ProcessingImagesSelection = (props) => {
  const dispatch = useDispatch();
  const processingImages = useSelector((state) => state.batchMode.processingImages);

  const onFilesChange = ({ file, fileList }) => {
    dispatch(setProcessingImages(fileList));
  };

  return (
    <WizardStep {...props}>
      <MultipleUpload
        fileList={processingImages}
        onFilesChange={onFilesChange}
        buttonLabel='Select Images for Processing'/>
    </WizardStep>
  );
};

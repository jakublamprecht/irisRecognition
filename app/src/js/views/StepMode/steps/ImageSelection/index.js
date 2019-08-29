import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uploadFile } from '../../../../api';
import { WizardStep } from '../../../../components/WizardStep';
import { SingleUpload, MODE } from '../../../../components/Upload/SingleUpload';
import { UploadImagePreview, UploadIcon, MainText } from '../../../../components/Upload/styles';
import { setStepData, addHistoryImage } from '../../../../actions/stepModeActions';

export const ImageSelection = (props) => {
  const { stepId } = props;
  const dispatch = useDispatch();
  const imageSelectionData = useSelector((state) => state.stepMode[stepId]);
  const { selectedImage, proxyImage } = imageSelectionData;

  const onFileChange = ({ file }) => {
    dispatch(setStepData(stepId, {
      selectedImage: file.path,
      proxyImage: '',
    }));
  };

  const renderNoFile = () => (
    <>
      <UploadIcon type='file-image'/>
      <MainText>
        Click or drag the image for processing.
      </MainText>
      <p>
        Select the iris image for the recognition process.
      </p>
    </>
  );

  const renderFileSelected = (filePath) => (
    <>
      <UploadImagePreview src={filePath}/>
      <MainText>
        Selected image: {filePath}
      </MainText>
      <p>
        Click or drag a file to change the selected image.
      </p>
    </>
  );

  const isFileSelected = () => {
    const canTransition = !!selectedImage;
    const description = canTransition ? 'Success' : 'Please select a file before going to the next step.';

    return {
      canTransition,
      description,
    };
  };

  const saveUploadFile = async () => {
    if (selectedImage && !proxyImage) {
      return uploadFile(selectedImage).then(({ data }) => {
        dispatch(setStepData(stepId, {
          selectedImage: selectedImage,
          proxyImage: data.image,
        }));
      });
    }
  };

  return (
    <WizardStep {...props}
      nextTransitionGuard={isFileSelected}
      onNextTransition={saveUploadFile}>
      <SingleUpload
        mode={MODE.IMAGE}
        file={selectedImage}
        onFileChange={onFileChange}
        renderNoFile={renderNoFile}
        renderFileSelected={renderFileSelected}
      />
    </WizardStep>
  );
};

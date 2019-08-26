import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { WizardStep } from '../../../../components/WizardStep';
import { SingleUpload, MODE } from '../../../../components/Upload/SingleUpload';
import { UploadImagePreview, UploadIcon, MainText } from '../../../../components/Upload/styles';
import { setStepData, addHistoryImage } from '../../../../actions/stepModeActions';

export const ImageSelection = (props) => {
  const { stepId } = props;
  const dispatch = useDispatch();
  const imageSelectionData = useSelector((state) => state.stepMode[stepId]);
  const { processingImage } = imageSelectionData;

  const onFileChange = ({ file }) => {
    dispatch(setStepData(stepId, { processingImage: file.path }));
    dispatch(addHistoryImage(stepId, file.path));
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

  return (
    <WizardStep {...props}>
      <SingleUpload
        mode={MODE.IMAGE}
        file={processingImage}
        onFileChange={onFileChange}
        renderNoFile={renderNoFile}
        renderFileSelected={renderFileSelected}
      />
    </WizardStep>
  );
};

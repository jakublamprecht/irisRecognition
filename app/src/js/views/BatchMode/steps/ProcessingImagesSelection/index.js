import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WizardStep } from '../../../../components/WizardStep';
import { MultipleUpload } from '../../../../components/Upload/MultipleUpload';
import { setProcessingImages } from '../../../../actions/batchModeActions';

export const ProcessingImagesSelection = (props) => {
  const dispatch = useDispatch();
  const processingImages = useSelector((state) => state.batchMode.processingImages);

  const onFilesChange = ({ fileList }) => {
    /*
     IMPORTANT: Might need to keep the whole array of objects and then destructure it
     so that we can set the Upload component defaultFileList to what it was before transition
     */
    // const filePaths = fileList.map((fileObject) => (
    //   fileObject.originFileObj.path
    // ));

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

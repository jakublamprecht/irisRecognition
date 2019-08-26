import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WizardStep } from '../../../../components/WizardStep';
import { SingleUpload, MODE } from '../../../../components/Upload/SingleUpload';
import { UploadIcon, MainText } from '../../../../components/Upload/styles';
import { setConfigFile, clearConfigFile } from '../../../../actions/batchModeActions';

export const ConfigSelection = (props) => {
  const dispatch = useDispatch();
  const configFile = useSelector((state) => state.batchMode.configFile);

  const onFileChange = ({ file }) => (
    dispatch(setConfigFile(file.path))
  );

  const onPreviousTransition = () => (
    dispatch(clearConfigFile())
  );

  const renderNoFile = () => (
    <>
      <UploadIcon type='cloud-upload'/>
      <MainText>
        Click or drag the configuration file for the process.
      </MainText>
      <p>
        Select the .json file that contains configuration for the iris recognition process.
      </p>
    </>
  );

  const renderFileSelected = (filePath) => (
    <>
      <UploadIcon type='setting' theme='filled'/>
      <MainText>
        Selected file: {filePath}
      </MainText>
      <p>
        Click or drag a file to change the selected configuration file.
      </p>
    </>
  );

  return (
    <WizardStep {...props} onPreviousTransition={onPreviousTransition}>
      <SingleUpload
        mode={MODE.CONFIG}
        file={configFile}
        onFileChange={onFileChange}
        renderNoFile={renderNoFile}
        renderFileSelected={renderFileSelected}
      />
    </WizardStep>
  );
};

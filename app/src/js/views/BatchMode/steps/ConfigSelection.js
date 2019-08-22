import React, { useState } from 'react';
import styled from 'styled-components';
import { Upload, Icon } from 'antd';

const { Dragger } = Upload;

const UploadIcon = styled(Icon)`
  padding-bottom: 20px;
  font-size: 3em;
  color: #1890ff;
`;

const MainText = styled.p`
  padding-bottom: 10px;
  font-size: 1.4em;
`;

export const ConfigSelection = () => {
  const [configFile, setConfigFile] = useState(undefined);

  const uploadConfig = {
    accept: '.json',
    multiple: false,
    showUploadList: false,
    onChange: ({ file }) => { setConfigFile(file); },
    beforeUpload: () => {
      return false;
    }
  }

  return (
    <Dragger {...uploadConfig}>
    {
      !configFile &&
      <>
        <UploadIcon type='cloud-upload'/>
        <MainText>
          Click or drag the configuration file for the process.
        </MainText>
        <p>
          Select the .json file that contains configuration for the iris recognition process.
        </p>
      </>
    }
    {
      configFile &&
      <>
        <UploadIcon type='setting' theme='filled'/>
        <MainText>
          Selected file: {configFile.name}
        </MainText>
        <p>
          Click or drag a file to change the selected configuration file.
        </p>
      </>
    }
    </Dragger>
  );
};

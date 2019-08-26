import React from 'react';
import { Upload } from 'antd';

const { Dragger } = Upload;

export const MODE = {
  IMAGE: 'IMAGE',
  CONFIG: 'CONFIG',
};

const acceptedExtensions = {
  [MODE.IMAGE]: '.png,.bmp,.tiff,.jpg,.jpeg',
  [MODE.CONFIG]: '.json',
};

export const SingleUpload = ({ mode, onFileChange, file, renderNoFile, renderFileSelected }) => {
  const uploadConfig = {
    accept: acceptedExtensions[mode],
    multiple: false,
    showUploadList: false,
    onChange: onFileChange,
    beforeUpload: () => false,
  };

  return (
    <Dragger {...uploadConfig}>
    {
      !file &&
      renderNoFile()
    }
    {
      file &&
      renderFileSelected(file)
    }
    </Dragger>
  );
};

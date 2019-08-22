import React from 'react';
import styled from 'styled-components';
import { Upload, Button, Icon } from 'antd';

const UploadWrapper = styled(Upload)`
  .ant-upload-select {
    display: block !important;
  };
`;

export const MultipleImageUpload = ({ buttonLabel }) => {
  const uploadConfig = {
    accept: '.png,.bmp,.tiff,.jpg,.jpeg',
    multiple: true,
    listType: 'picture',
    beforeUpload: (file) => {
      return false;
    }
  };

  return (
    <UploadWrapper {...uploadConfig}>
      <Button type='primary' block>
        {buttonLabel} <Icon type='upload'/>
      </Button>
    </UploadWrapper>
  );
};

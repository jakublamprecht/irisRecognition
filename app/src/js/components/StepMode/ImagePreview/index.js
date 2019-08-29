import * as path from 'path';
import React from 'react';
import { Button, Icon } from 'antd';
import { Image, PreviewWrapper, ButtonsWrapper } from './styles';

export const ImagePreview = ({ srcImage }) => {
  const saveImage = () => {
    const fileName = path.basename(srcImage);
    const link = document.createElement('a');

    link.setAttribute('download', fileName);
    link.setAttribute('href', srcImage);
    link.click();
  }

  return (
    <PreviewWrapper>
      <Image src={srcImage}/>
      {
        srcImage &&
        <ButtonsWrapper>
          <Button type='primary' onClick={saveImage}>
            Save <Icon type='save'/>
          </Button>
        </ButtonsWrapper>
      }
    </PreviewWrapper>
  );
};

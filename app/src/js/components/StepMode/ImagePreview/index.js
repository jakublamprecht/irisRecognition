import * as path from 'path';
import React from 'react';
import { Button, Icon } from 'antd';
import { Image, PreviewWrapper, ButtonsWrapper, EmptyImage, EmptyContent } from './styles';

export const ImagePreview = ({ className, srcImage }) => {
  const saveImage = () => {
    const fileName = path.basename(srcImage);
    const link = document.createElement('a');

    link.setAttribute('download', fileName);
    link.setAttribute('href', srcImage);
    link.click();
  }

  return (
    <PreviewWrapper className={className}>
      {
        srcImage &&
        <>
          <Image src={srcImage}/>
          <ButtonsWrapper>
            <Button type='primary' onClick={saveImage}>
              Save <Icon type='save'/>
            </Button>
          </ButtonsWrapper>
        </>
      }
      {
        !srcImage &&
        <EmptyImage>
          <EmptyContent>
            <Icon type='file-image'/>
            <p>Image not available</p>
          </EmptyContent>
        </EmptyImage>
      }
    </PreviewWrapper>
  );
};

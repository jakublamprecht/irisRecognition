import React from 'react';
import { useSelector } from 'react-redux';

import { Image } from './styles';

export const ImagePreview = () => {
  // Will this preserve the required order of the images? Also keep in mind that the value of the object can also be an array like in preprocessing
  const previewImage = useSelector((state) => Object.values(state.stepMode.historyImages).slice(-1)[0]);

  return (
    <Image src={previewImage}/>
  );
};

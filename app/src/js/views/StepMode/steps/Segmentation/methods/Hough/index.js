import React from 'react';

import { FWInputNumber } from '../../../../../../components/Form/styles';
import { ParamsForm } from '../../../../../../components/StepMode/ParamsForm';

const houghFieldsConfig = {
  kernelWidth: {
    label: 'Kernel width',
    config: {
      initialValue: 3,
    },
    renderInput: () => <FWInputNumber min={0}/>
  },
};

export const Hough = (props) => (
  <ParamsForm fields={houghFieldsConfig} {...props}/>
);

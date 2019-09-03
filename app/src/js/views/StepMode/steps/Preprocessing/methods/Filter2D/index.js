import React from 'react';

import { FWInputNumber } from '../../../../../../components/Form/styles';
import { ParamsForm } from '../../../../../../components/StepMode/ParamsForm';

const filter2DFieldConfigs = {
  kernelSize: {
    label: 'Kernel size',
    config: {
      initialValue: 5,
    },
    renderInput: () => <FWInputNumber min={0}/>
  },
};

export const Filter2D = (props) => (
  <ParamsForm fields={filter2DFieldConfigs} {...props}/>
);

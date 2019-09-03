import React from 'react';

import { FWInputNumber } from '../../../../../../components/Form/styles';
import { ParamsForm } from '../../../../../../components/StepMode/ParamsForm';

const daugmanFieldsConfig = {
  kernelWidth: {
    label: 'Kernel width',
    config: {
      initialValue: 3,
    },
    renderInput: () => <FWInputNumber min={0}/>
  },
};

export const Daugman = (props) => (
  <ParamsForm fields={daugmanFieldsConfig} {...props}/>
);

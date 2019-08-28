import React from 'react';

import { FWInputNumber } from '../../../../../../components/Form/styles';
import { ParamsForm } from '../../../../../../components/StepMode/ParamsForm';

const medianFieldsConfig = {
  kernelSize: {
    label: 'Kernel size',
    config: {
      initialValue: 3,
    },
    renderInput: () => <FWInputNumber min={0}/>
  },
};

export const Median = (props) => (
  <ParamsForm fields={medianFieldsConfig} {...props}/>
);

import React from 'react';

import { FWInputNumber } from '../../../../../../components/Form/styles';
import { ParamsForm } from '../../../../../../components/StepMode/ParamsForm';

const fieldsConfig = {
  kernelWidth: {
    label: 'Kernel width',
    config: {
      initialValue: 3,
    },
    renderInput: () => <FWInputNumber min={0}/>
  },
};

export const ActiveContours = (props) => (
  <ParamsForm fields={fieldsConfig} {...props}/>
);

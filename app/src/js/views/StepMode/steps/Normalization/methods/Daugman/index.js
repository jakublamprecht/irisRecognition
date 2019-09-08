import React from 'react';

import { FWInputNumber } from '../../../../../../components/Form/styles';
import { ParamsForm } from '../../../../../../components/StepMode/ParamsForm';

const daugmanFieldsConfig = {
  width: {
    label: 'Angular resolution (width)',
    config: {
      initialValue: 240,
    },
    renderInput: () => <FWInputNumber min={0}/>
  },
  height: {
    label: 'Radial resolution (height)',
    config: {
      initialValue: 20,
    },
    renderInput: () => <FWInputNumber min={0}/>
  },
};

export const Daugman = (props) => (
  <ParamsForm fields={daugmanFieldsConfig} {...props}/>
);

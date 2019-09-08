import React from 'react';

import { FWInputNumber } from '../../../../../../components/Form/styles';
import { ParamsForm } from '../../../../../../components/StepMode/ParamsForm';

const loggaborFieldsConfig = {
  minWaveLength: {
    label: 'Base wavelength',
    config: {
      initialValue: 18,
    },
    renderInput: () => <FWInputNumber min={0} step={0.1}/>
  },
  sigmaOnf: {
    label: 'Bandwidth parameter',
    config: {
      initialValue: 0.5,
    },
    renderInput: () => <FWInputNumber min={0} step={0.05}/>
  },
  // Seems like this parameter is not required if I use one loggabor filter
  // mult: {
  //   label: 'Multiplicative ',
  //   config: {
  //     initialValue: 70,
  //   },
  //   renderInput: () => <FWInputNumber min={0}/>
  // },
};

export const Loggabor = (props) => (
  <ParamsForm fields={loggaborFieldsConfig} {...props}/>
);

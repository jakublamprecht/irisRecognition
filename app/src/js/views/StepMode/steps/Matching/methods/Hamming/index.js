import React from 'react';

import { FWInputNumber } from '../../../../../../components/Form/styles';
import { ParamsForm } from '../../../../../../components/StepMode/ParamsForm';

const hammingFieldsConfig = {
  acceptedHammingDist: {
    label: 'Hamming Distance Threshold',
    config: {
      initialValue: 0.35,
    },
    renderInput: () => <FWInputNumber min={0} step={0.01}/>
  },
  shiftsNumber: {
    label: 'Number of shifts',
    config: {
      initialValue: 1,
    },
    renderInput: () => <FWInputNumber min={0}/>
  },
};

export const Hamming = (props) => (
  <ParamsForm fields={hammingFieldsConfig} {...props}/>
);

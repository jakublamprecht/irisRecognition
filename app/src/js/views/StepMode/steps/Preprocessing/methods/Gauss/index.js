import React from 'react';

import { FWInputNumber } from '../../../../../../components/Form/styles';
import { ParamsForm } from '../../../../../../components/StepMode/ParamsForm';

const gaussFieldsConfig = {
  kernelWidth: {
    label: 'Kernel width',
    config: {
      initialValue: 3,
    },
    renderInput: () => <FWInputNumber min={0}/>
  },
  kernelHeight: {
    label: 'Kernel height',
    config: {
      initialValue: 3,
    },
    renderInput: () => <FWInputNumber min={0}/>
  },
  sigmaX: {
    label: 'Sigma X',
    config: {
      initialValue: 0,
    },
    renderInput: () => <FWInputNumber min={0}/>
  },
  sigmaY: {
    label: 'Sigma Y',
    config: {
      initialValue: 0,
    },
    renderInput: () => <FWInputNumber min={0}/>
  },
};

export const Gauss = (props) => (
  <ParamsForm fields={gaussFieldsConfig} {...props}/>
);

export const preprocessingMethods = {
  defaultMethod: 'gauss',
  methods: {
    gauss: {
      id: 'gauss',
      name: 'Gauss',
      inputs: [
        {
          type: 'number',
          id: 'kernelWidth',
          label: 'Kernel Width',
          min: 1,
          max: 99,
          step: 2,
          defaultValue: 3,
        },
        {
          type: 'number',
          id: 'kernelHeight',
          label: 'Kernel Height',
          min: 1,
          max: 99,
          step: 2,
          defaultValue: 3,
        },
        {
          type: 'number',
          id: 'sigmaX',
          label: 'Sigma X',
          min: 0,
          max: 999,
          defaultValue: 0,
        },
        {
          type: 'number',
          id: 'sigmaY',
          label: 'Sigma Y',
          min: 0,
          max: 999,
          defaultValue: 0,
        },
      ],
    },
  },
};

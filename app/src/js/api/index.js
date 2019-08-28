import axios from 'axios';
import { API_PATH } from '../constants/api';

const API = axios.create({
  baseURL: API_PATH,
});

export const uploadFile = (filePath) => (
  API.post('/upload', { filePath })
);

export const gaussianBlur = (filePath, { kernelWidth, kernelHeight, sigmaX, sigmaY }) => (
  API.get('/gauss', {
    params: {
      filePath,
      kernelWidth,
      kernelHeight,
      sigmaX,
      sigmaY,
    },
  })
);

export const medianBlur = (filePath, { kernelSize }) => (
  API.get('/median', {
    params: {
      filePath,
      kernelSize,
    },
  })
);

export const normalizeHistogram = (filePath) => (
  API.get('/histnorm', {
    params: {
      filePath,
    },
  })
);

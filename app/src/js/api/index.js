import axios from 'axios';
import qs from 'qs';
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

export const filter2D = (filePath, { kernelSize }) => (
  API.get('/filter2D', {
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

export const segmentation = (filePath, segmentationMethod, noiseMethod) => (
  API.get('/segmentation', {
    params: {
      filePath,
      segmentationMethod,
      noiseMethod,
    },
  })
);

export const normalizeDaugman = (filePath, mask, { irisCenterX, irisCenterY, irisR, pupilCenterX, pupilCenterY, pupilR, width, height }) => (
  API.get('/normDaugman', {
    params: {
      filePath,
      mask,
      irisCenterX,
      irisCenterY,
      irisR,
      pupilCenterX,
      pupilCenterY,
      pupilR,
      width,
      height,
    },
  })
);

export const encodeLogGabor = (normalizedImage, normalizedMask, { minWaveLength, sigmaOnf }) => (
  API.get('/loggabor', {
    params: {
      normalizedImage,
      normalizedMask,
      minWaveLength,
      sigmaOnf,
    },
  })
);

export const performMatching = (irisTemplate, maskTemplate, matchingImages, processConfig) => (
  API.get('/matching', {
    params: {
      irisTemplate,
      maskTemplate,
      matchingImages: qs.parse(matchingImages),
      processConfig: qs.parse(processConfig),
    },
  })
);

import { ImageSelection } from './ImageSelection';
import { Preprocessing } from './Preprocessing';
import { Segmentation } from './Segmentation';
import { Normalization } from './Normalization';
import { Encoding } from './Encoding';
import { MatchingImagesSelection } from './Matching/MatchingImages';
import { Matching } from './Matching/Matching';
import { MatchingProcessing } from './Matching/MatchingProcessing';
import { Results } from './Results';

export const stepComponents = {
  ImageSelection,
  Preprocessing,
  Segmentation,
  Normalization,
  Encoding,
  MatchingImagesSelection,
  Matching,
  MatchingProcessing,
  Results,
};

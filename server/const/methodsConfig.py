import const.processSteps as processSteps
import processing.preprocessing as preprocessing
import processing.segmentation as segmentation
import processing.normalization as normalization
import processing.encoding as encoding
import processing.matching.hamming as hamming

METHODS = {}

METHODS[processSteps.PREPROCESSING] = {
    'GAUSS': preprocessing.gauss.gauss,
    'MEDIAN': preprocessing.median.median,
    'HISTOGRAM_NORMALIZATION': preprocessing.histogramNorm.histogramNorm,
    'FILTER_2D': preprocessing.filter2D.filter2D
}

# Not required, since parameters can be passed straight into segmentation function
METHODS[processSteps.SEGMENTATION] = segmentation.segmentacja_teczowki.segmentation

METHODS[processSteps.NORMALIZATION] = {
    'DAUGMAN': normalization.daugman.normalize_daugman
}

METHODS[processSteps.ENCODING] = {
    'LOG_GABOR': encoding.loggabor.encode
}

METHODS[processSteps.MATCHING] = {
    'HAMMING': hamming.hamming_distance
}

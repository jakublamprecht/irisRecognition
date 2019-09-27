import sys
import os
import json
from utils.conductProcess import conductProcessForSingleConfig
from utils.calcMetrics import calcMetricsForResults

# Already done
# experimentDirectories = [
#     'daugmanNoneMasek',
#     'daugmanParabolicMasek',
# ]

# For getting segmentation results. To shorten experiment
currentDir = os.path.dirname(__file__)
cachedNoneResultsPath = os.path.abspath(os.path.join(currentDir, '..', '..', '..', 'experiment', 'daugmanNoneMasek', 'segmentationResults.json'))
cachedParabolicResultsPath = os.path.abspath(os.path.join(currentDir, '..', '..', '..', 'experiment', 'daugmanParabolicMasek', 'segmentationResults.json'))

with open(cachedNoneResultsPath) as noneFile:
    cachedNoneResults = json.load(noneFile)

with open(cachedParabolicResultsPath) as parabolicFile:
    cachedParabolicResults = json.load(parabolicFile)

experimentDirectoriesNone = [
    'daugmanNoneMasekHigherHD',
    'daugmanNoneMasekLowerHD',
    'daugmanNoneMasekHalfHD',
    'daugmanNoneMasekLowerNormSize',
    'daugmanNoneMasekHigherNormSize',
    'daugmanNoneMasekLowerSigma',
    'daugmanNoneMasekHigherSigma',
    'daugmanNoneMasekLowerShifts'
]

experimentDirectoriesParabolic = [
    'daugmanParabolicMasekHigherHD',
    'daugmanParabolicMasekLowerHD',
    'daugmanParabolicMasekHalfHD',
    'daugmanParabolicMasekLowerNormSize',
    'daugmanParabolicMasekHigherNormSize',
    'daugmanParabolicMasekLowerSigma',
    'daugmanParabolicMasekHigherSigma',
    'daugmanParabolicMasekLowerShifts'
]

for directory in experimentDirectoriesNone:
    print('Processing: {}'.format(directory))
    # The second arguments provides information about where segmentation
    # results for images could be found
    conductProcessForSingleConfig(directory, cachedNoneResults)

for directory in experimentDirectoriesParabolic:
    print('Processing: {}'.format(directory))
    # The second arguments provides information about where segmentation
    # results for images could be found
    conductProcessForSingleConfig(directory, cachedParabolicResults)

for directory in experimentDirectoriesNone:
    print('Calculating metrics: {}'.format(directory))
    calcMetricsForResults(directory)

for directory in experimentDirectoriesParabolic:
    print('Calculating metrics: {}'.format(directory))
    calcMetricsForResults(directory)

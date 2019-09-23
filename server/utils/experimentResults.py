import os
import json
import sys
from processing.matching.matching import matchMultipleToMultiple

currentDir = os.path.dirname(__file__)
CASIA = os.path.abspath(os.path.join(currentDir, '..', '..', '..', 'CASIAFLAT'))
configPath = os.path.abspath(os.path.join(currentDir, '..', '..', '..', 'config.json'))
resultsPath = os.path.abspath(os.path.join(currentDir, '..', '..', '..', 'results.json'))

with open(configPath) as f:
    processConfig = json.load(f)

def getFullPath(el):
    return os.path.join(CASIA, el)

allCasiaFiles = list(map(getFullPath, os.listdir(CASIA)))

results = matchMultipleToMultiple(allCasiaFiles, allCasiaFiles, processConfig)

for dump, processingResult in results.items():
    if 'images' in processingResult['processingImageData']:
        processingResult['processingImageData'].pop('images')

    for dump2, matchingEntry in processingResult['matchingEntries'].items():
        if 'images' in matchingEntry['matchingImageData']:
            matchingEntry['matchingImageData'].pop('images')

fresults = open(resultsPath, 'w+')
resultsJson = json.dump(results, fresults)

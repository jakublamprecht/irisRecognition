import os
import json
import sys
from processing.matching.matching import matchMultipleToMultiple

def getFullPath(el):
    return os.path.join(CASIA, el)

currentDir = os.path.dirname(__file__)
CASIA = os.path.abspath(os.path.join(currentDir, '..', '..', '..', 'CASIAFLAT'))
allCasiaFiles = list(map(getFullPath, os.listdir(CASIA)))

def conductProcessForSingleConfig(dirName, cachedResults=False):
    configPath = os.path.abspath(os.path.join(currentDir, '..', '..', '..', 'experiment', dirName, 'config.json'))
    resultsPath = os.path.abspath(os.path.join(currentDir, '..', '..', '..', 'experiment', dirName, 'results.json'))

    with open(configPath) as f:
        processConfig = json.load(f)

    results = matchMultipleToMultiple(allCasiaFiles[0:300], allCasiaFiles[0:300], processConfig, cachedResults)

    for dump, processingResult in results.items():
        if 'images' in processingResult['processingImageData']:
            processingResult['processingImageData'].pop('images')

        for dump2, matchingEntry in processingResult['matchingEntries'].items():
            if 'images' in matchingEntry['matchingImageData']:
                matchingEntry['matchingImageData'].pop('images')

    fresults = open(resultsPath, 'w+')
    resultsJson = json.dump(results, fresults)
    fresults.close()

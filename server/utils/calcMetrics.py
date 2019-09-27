import sys
import os
import json

def getImageIdFromPath(imagePath):
    imageBaseName = os.path.basename(imagePath)
    imageBaseName = imageBaseName.replace('CASIAFLAT', '')
    imageId = imageBaseName[0:3]

    return imageId

def calcMetricsForResults(dirName):
    currentDir = os.path.dirname(__file__)
    resultsFile = os.path.abspath(os.path.join(currentDir, '..', '..', '..', 'experiment', dirName, 'results.json'))
    metricsFilePath = os.path.abspath(os.path.join(currentDir, '..', '..', '..', 'experiment', dirName, 'metrics.json'))

    with open(resultsFile) as f:
        resultsJson = json.load(f)

    totalAttempts = 0
    attemptsCounter = 0
    FARcounter = 0
    FRRcounter = 0

    for processingImagePath, processingResult in resultsJson.items():
        print(processingImagePath)
        processingImageId = getImageIdFromPath(processingImagePath)

        for matchingImagePath, matchingEntry in processingResult['matchingEntries'].items():
            print(matchingImagePath)
            matchingImageId = getImageIdFromPath(matchingImagePath)
            matchingResults = matchingEntry['matchingResults']

            totalAttempts = totalAttempts + 1

            if matchingResults['minDistanceValue'] == 2:
                continue

            wasMatched = matchingResults['isMatched']
            shouldBeMatched = processingImageId == matchingImageId

            attemptsCounter = attemptsCounter + 1

            if (wasMatched and not shouldBeMatched):
                FARcounter = FARcounter + 1
            if (not wasMatched and shouldBeMatched):
                FRRcounter = FRRcounter + 1

            print('Attempts: {}'.format(attemptsCounter))
            print('FAR counter: {}'.format(FARcounter))
            print('FRR counter: {}'.format(FRRcounter))
            print('-------------')

    FAR = FARcounter / attemptsCounter
    FRR = FRRcounter / attemptsCounter

    metrics = {
        'validAttempts': attemptsCounter,
        'totalAttempts': totalAttempts,
        'FAR': FAR,
        'FRR': FRR
    }

    fmetrics = open(metricsFilePath, 'w+')
    json.dump(metrics, fmetrics)
    fmetrics.close()

    return metrics

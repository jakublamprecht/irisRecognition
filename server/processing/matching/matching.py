from const.methodsConfig import METHODS
import const.processSteps as processSteps
from utils.processConfig import getMethodHandlerAndMethodParams
from processing.fullProcess import processSingleImage

# Used by stepMode matching - data of the image (the tested one) taken from Step Mode
# Used by matchMultipleToMultiple - data of the image (the tested one) will be returned by matchMultipleToMultiple
def matchSingleToMultiple(irisTemplate, maskTemplate, matchingImages, processConfig):
    results = {}

    for matchingImage in matchingImages:
        if matchingImage in results:
            continue

        imageResults = processSingleImage(matchingImage, processConfig)
        matchingIrisTemplate = imageResults['images']['irisTemplate']
        matchingMaskTemplate = imageResults['images']['maskTemplate']

        matchingMethod, matchingParams = getMethodHandlerAndMethodParams(processSteps.MATCHING, processConfig[processSteps.MATCHING])
        matchingResults = matchingMethod(irisTemplate, maskTemplate, matchingIrisTemplate, matchingMaskTemplate, **matchingParams)

        results[matchingImage] = {
            'matchingImageData': imageResults,
            'matchingResults': matchingResults
        }

    return results

def matchMultipleToMultiple(processingImages, matchingImages, processConfig):
    processingData = {
        'processingImages': {},
        'matchingImages': {}
    }

    processingResults = {}

    indexFullProcess = 1
    indexFullMatching = 1

    for processingImage in processingImages:
        print('Processing {}/{} of processing images'.format(indexFullProcess, len(processingImages)))
        if processingImage in processingData['processingImages']:
            pass
        else:
            result = processSingleImage(processingImage, processConfig)
            processingData['processingImages'][processingImage] = result
        indexFullProcess = indexFullProcess + 1

    for matchingImage in matchingImages:
        print('Processing {}/{} of matching images'.format(indexFullMatching, len(matchingImages)))
        if matchingImage in processingData['processingImages']:
            processingData['matchingImages'][matchingImage] = processingData['processingImages'][matchingImage]
        elif matchingImage in processingData['matchingImages']:
            pass
        else:
            result = processSingleImage(matchingImage, processConfig)
            processingData['matchingImages'][matchingImage] = result
        indexFullMatching = indexFullMatching + 1

    matchingMethod, matchingParams = getMethodHandlerAndMethodParams(processSteps.MATCHING, processConfig[processSteps.MATCHING])

    indexHDProcessing = 1
    indexHDMatching = 1

    for pKey, singleProcessingData in processingData['processingImages'].items():
        irisTemplate = singleProcessingData['images']['irisTemplate']
        maskTemplate = singleProcessingData['images']['maskTemplate']

        processingResults[pKey] = {
            'processingImageData': singleProcessingData,
            'matchingEntries': {}
        }

        for mKey, singleMatchingData in processingData['matchingImages'].items():
            matchingIrisTemplate = singleMatchingData['images']['irisTemplate']
            matchingMaskTemplate = singleMatchingData['images']['maskTemplate']

            print('Matching {}/{} processing image with {}/{} matching image'.format(indexHDProcessing, len(processingData['processingImages']), indexHDMatching, len(processingData['matchingImages'])))
            matchingResults = matchingMethod(irisTemplate, maskTemplate, matchingIrisTemplate, matchingMaskTemplate, **matchingParams)
            indexHDMatching = indexHDMatching + 1

            processingResults[pKey]['matchingEntries'][mKey] = {
                'matchingImageData': singleMatchingData,
                'matchingResults': matchingResults
            }

        indexHDMatching = 1
        indexHDProcessing = indexHDProcessing + 1

    return processingResults

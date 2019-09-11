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

    for processingImage in processingImages:
        if processingImage in processingData['processingImages']:
            pass
        else:
            result = processSingleImage(processingImage, processConfig)
            processingData['processingImages'][processingImage] = result

    for matchingImage in matchingImages:
        if matchingImage in processingData['processingImages']:
            processingData['matchingImages'][matchingImage] = processingData['processingImages'][matchingImage]
        elif matchingImage in processingData['matchingImages']:
            pass
        else:
            result = processSingleImage(matchingImage, processConfig)
            processingData['matchingImages'][matchingImage] = result

    matchingMethod, matchingParams = getMethodHandlerAndMethodParams(processSteps.MATCHING, processConfig[processSteps.MATCHING])

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

            matchingResults = matchingMethod(irisTemplate, maskTemplate, matchingIrisTemplate, matchingMaskTemplate, **matchingParams)

            processingResults[pKey]['matchingEntries'][mKey] = {
                'matchingImageData': singleMatchingData,
                'matchingResults': matchingResults
            }

    return processingResults

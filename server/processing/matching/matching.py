from const.methodsConfig import METHODS
import const.processSteps as processSteps
from utils.processConfig import getMethodHandlerAndMethodParams
from processing.fullProcess import processSingleImage

# Used by stepMode matching - data of the image (the tested one) taken from Step Mode
# Used by matchMultipleToMultiple - data of the image (the tested one) will be returned by matchMultipleToMultiple
def matchSingleToMultiple(irisTemplate, maskTemplate, matchingImages, processConfig):
    results = []

    for i in range(len(matchingImages)):
        imageResults = processSingleImage(matchingImages[i], processConfig)
        matchingIrisTemplate = imageResults['images']['irisTemplate']
        matchingMaskTemplate = imageResults['images']['maskTemplate']

        matchingMethod, matchingParams = getMethodHandlerAndMethodParams(processSteps.MATCHING, processConfig[processSteps.MATCHING])
        matchingResults = matchingMethod(irisTemplate, maskTemplate, matchingIrisTemplate, matchingMaskTemplate, **matchingParams)

        imageResults = { **imageResults, 'matchingResults': matchingResults }

        results.append(imageResults)

    return results

def matchMultipleToMultiple(images, matchingImages, processConfig):
    return false

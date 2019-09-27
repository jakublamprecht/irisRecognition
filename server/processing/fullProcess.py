import const.processSteps as processSteps
from const.methodsConfig import METHODS
from utils.generateNewProxyImagePath import generateNewProxyImagePath
from utils.getNewFilePath import getNewFilePath
from utils.processConfig import getMethodHandlerAndMethodParams
import cv2

def processSingleImage(imagePath, processConfig, cachedResults=False):
    orgImage = cv2.imread(imagePath, cv2.CV_8UC1)
    image = orgImage.copy()

    # Creating new entry
    proxyImagePath = generateNewProxyImagePath(imagePath)
    cv2.imwrite(proxyImagePath, orgImage)

    # Preprocessing the image
    preprocessingImages = []
    preprocessingImagesPaths = []
    preprocessingEntries = processConfig[processSteps.PREPROCESSING]

    numberOfPreprocessingEntries = len(preprocessingEntries)
    shouldBePreprocessed = numberOfPreprocessingEntries > 0

    if shouldBePreprocessed:
        for i in range(numberOfPreprocessingEntries):
            currentPreprocessingEntry = preprocessingEntries[i]
            currentPreprocessingMethod, methodParams = getMethodHandlerAndMethodParams(processSteps.PREPROCESSING, currentPreprocessingEntry)

            image = currentPreprocessingMethod(image, **methodParams)
            preprocessingImagePath = getNewFilePath(proxyImagePath, 'preprocessing')

            cv2.imwrite(preprocessingImagePath, image)

            preprocessingImages.append(image)
            preprocessingImagesPaths.append(preprocessingImagePath)

    # Performing segmentation

    segmentationArgs = processConfig[processSteps.SEGMENTATION]
    segmentationMethod = METHODS[processSteps.SEGMENTATION]

    if (cachedResults and imagePath in cachedResults):
        print('Getting cached results for {}'.format(imagePath))
        currentCache = cachedResults[imagePath]['processingImageData']
        segmentationResults = currentCache['segmentationResults']
        mask = cv2.imread(currentCache['imagePaths']['mask'], cv2.CV_8UC1)
        maskPreview = cv2.imread(currentCache['imagePaths']['imageMasked'], cv2.CV_8UC1)
    else:
        segmentationResults, mask, maskPreview = segmentationMethod(image, **segmentationArgs)

    maskPath = getNewFilePath(proxyImagePath, 'segmentation-mask')
    maskPreviewPath = getNewFilePath(proxyImagePath, 'segmentation-mask-preview')
    cv2.imwrite(maskPath, mask)
    cv2.imwrite(maskPreviewPath, maskPreview)

    # Performing normalization

    normalizationMethod, normalizationParams = getMethodHandlerAndMethodParams(processSteps.NORMALIZATION, processConfig[processSteps.NORMALIZATION])

    normalizedImage, normalizedMask, normalizedImageMasked = normalizationMethod(image, mask, **segmentationResults, **normalizationParams)

    normalizedImagePath = getNewFilePath(proxyImagePath, 'normalization-image')
    normalizedMaskPath = getNewFilePath(proxyImagePath, 'normalization-mask')
    normalizedImageMaskedPath = getNewFilePath(proxyImagePath, 'normalization-mask-preview')
    cv2.imwrite(normalizedImagePath, normalizedImage)
    cv2.imwrite(normalizedMaskPath, normalizedMask)
    cv2.imwrite(normalizedImageMaskedPath, normalizedImageMasked)

    # Performing encoding

    encodingMethod, encodingParams = getMethodHandlerAndMethodParams(processSteps.ENCODING, processConfig[processSteps.ENCODING])

    if processConfig[processSteps.ENCODING]['method'] == 'LOG_GABOR':
        encodingParams = { **encodingParams, 'mult': 1 }

    irisTemplate, maskTemplate = encodingMethod(normalizedImage, normalizedMask, **encodingParams)

    irisTemplatePath = getNewFilePath(proxyImagePath, 'encoding-iris-template')
    maskTemplatePath = getNewFilePath(proxyImagePath, 'encoding-mask-template')
    cv2.imwrite(irisTemplatePath, irisTemplate)
    cv2.imwrite(maskTemplatePath, maskTemplate)

    return {
        'images': {
            'originalImage': orgImage,
            'preprocessedImages': preprocessingImages,
            'mask': mask,
            'imageMasked': maskPreview,
            'normalizedImage': normalizedImage,
            'normalizedMask': normalizedMask,
            'normalizedImageMasked': normalizedImageMasked,
            'irisTemplate': irisTemplate,
            'maskTemplate': maskTemplate,
        },
        'imagePaths': {
            'originalImage': imagePath,
            'preprocessingImages': preprocessingImagesPaths,
            'mask': maskPath,
            'imageMasked': maskPreviewPath,
            'normalizedImage': normalizedImagePath,
            'normalizedMask': normalizedMaskPath,
            'normalizedImageMasked': normalizedImageMaskedPath,
            'irisTemplate': irisTemplatePath,
            'maskTemplate': maskTemplatePath,
        },
        'segmentationResults': segmentationResults,
    }


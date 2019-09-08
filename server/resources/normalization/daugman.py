from flask_restful import Resource, reqparse
from processing.normalization.daugman import normalize_daugman
from utils.getNewFilePath import getNewFilePath
import cv2

class Daugman(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('filePath', type=str)
        parser.add_argument('mask', type=str)
        parser.add_argument('irisCenterX', type=int)
        parser.add_argument('irisCenterY', type=int)
        parser.add_argument('irisR', type=int)
        parser.add_argument('pupilCenterX', type=int)
        parser.add_argument('pupilCenterY', type=int)
        parser.add_argument('pupilR', type=int)
        parser.add_argument('height', type=int)
        parser.add_argument('width', type=int)
        args = parser.parse_args()

        srcPath = args['filePath']
        maskPath = args['mask']
        irisCenterX = args['irisCenterX']
        irisCenterY = args['irisCenterY']
        irisR = args['irisR']
        pupilCenterX = args['pupilCenterX']
        pupilCenterY = args['pupilCenterY']
        pupilR = args['pupilR']
        height = args['height']
        width = args['width']

        srcImage = cv2.imread(srcPath, cv2.CV_8UC1)
        mask = cv2.imread(maskPath, cv2.CV_8UC1)
        normalizedImage, normalizedMask, normalizedImageMasked = normalize_daugman(srcImage, mask, irisCenterX, irisCenterY, irisR, pupilCenterX, pupilCenterY, pupilR, width, height)

        normalizedImagePath = getNewFilePath(srcPath, 'normalize-daug-img')
        normalizedMaskPath = getNewFilePath(maskPath, 'normalize-daug-mask')
        normalizedImageMaskedPath = getNewFilePath(srcPath, 'normalize-daug-mask-prev')

        cv2.imwrite(normalizedImagePath, normalizedImage)
        cv2.imwrite(normalizedMaskPath, normalizedMask)
        cv2.imwrite(normalizedImageMaskedPath, normalizedImageMasked)

        return {
            'workingImage': srcPath,
            'workingMask': maskPath,
            'normalizedImage': normalizedImagePath,
            'normalizedMask': normalizedMaskPath,
            'normalizedImageMasked': normalizedImageMaskedPath,
        }

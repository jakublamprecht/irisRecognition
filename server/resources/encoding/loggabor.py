from flask_restful import Resource, reqparse
from processing.encoding.loggabor import encode
from utils.getNewFilePath import getNewFilePath
import cv2
from os import path

class Loggabor(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('normalizedImage', type=str)
        parser.add_argument('normalizedMask', type=str)
        parser.add_argument('minWaveLength', type=float)
        parser.add_argument('sigmaOnf', type=float)
        args = parser.parse_args()

        normalizedImagePath = args['normalizedImage']
        normalizedMaskPath = args['normalizedMask']
        minWaveLength = args['minWaveLength']
        sigmaOnf = args['sigmaOnf']

        normalizedImage = cv2.imread(normalizedImagePath, cv2.CV_8UC1)
        normalizedMask = cv2.imread(normalizedMaskPath, cv2.CV_8UC1)
        imageTemplate, maskTemplate = encode(normalizedImage, normalizedMask, minWaveLength, 1, sigmaOnf)
        imageTemplatePath = getNewFilePath(normalizedImagePath, 'encoding-loggabor-img-template')
        maskTemplatePath = getNewFilePath(normalizedImagePath, 'encoding-loggabor-mask-template')

        cv2.imwrite(imageTemplatePath, imageTemplate)
        cv2.imwrite(maskTemplatePath, maskTemplate)

        return {
            'imageTemplate': imageTemplatePath,
            'maskTemplate': maskTemplatePath
        }

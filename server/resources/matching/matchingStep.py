from flask_restful import Resource, reqparse
from processing.matching.matching import matchSingleToMultiple
from utils.getNewFilePath import getNewFilePath
import cv2
import json
from os import path

class MatchingStep(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('irisTemplate', type=str)
        parser.add_argument('maskTemplate', type=str)
        parser.add_argument('matchingImages', type=str)
        parser.add_argument('processConfig', type=str)
        args = parser.parse_args()

        irisTemplatePath = args['irisTemplate']
        maskTemplatePath = args['maskTemplate']
        # THOSE HAVE TO BE SOMEHOW DECODED TO ARRAY AND OBJECT
        matchingImagesPaths = list(json.loads(args['matchingImages']).values())
        processConfig = json.loads(args['processConfig'])

        # These might have to be reshaped and will most likely need to be converted to boolean values
        irisTemplate = cv2.imread(irisTemplatePath, cv2.CV_8UC1)
        maskTemplate = cv2.imread(maskTemplatePath, cv2.CV_8UC1)

        # Processing here - some common function that will also be used for the batch mode
        results = matchSingleToMultiple(irisTemplate, maskTemplate, matchingImagesPaths, processConfig)

        # Getting rid of numpy arrays from the results dictionary
        for dump, result in results.items():
            if 'images' in result['matchingImageData']:
                result['matchingImageData'].pop('images')

        return results

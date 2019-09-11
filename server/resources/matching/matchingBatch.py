from flask_restful import Resource, reqparse
from processing.matching.matching import matchMultipleToMultiple
from utils.getNewFilePath import getNewFilePath
import cv2
import json
from os import path

class MatchingBatch(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('processingImages', type=str)
        parser.add_argument('matchingImages', type=str)
        parser.add_argument('processConfigFilePath', type=str)
        args = parser.parse_args()

        processConfigFilePath = args['processConfigFilePath']
        # THOSE HAVE TO BE SOMEHOW DECODED TO ARRAY AND OBJECT
        processingImagesPaths = list(json.loads(args['processingImages']).values())
        matchingImagesPaths = list(json.loads(args['matchingImages']).values())

        # Add error handling if JSON has invalid structure
        if processConfigFilePath:
            with open(processConfigFilePath) as f:
                processConfig = json.load(f)

        # Processing here - some common function that will also be used for the batch mode
        results = matchMultipleToMultiple(processingImagesPaths, matchingImagesPaths, processConfig)

        for dump, processingResult in results.items():
            if 'images' in processingResult['processingImageData']:
                processingResult['processingImageData'].pop('images')

            for dump2, matchingEntry in processingResult['matchingEntries'].items():
                if 'images' in matchingEntry['matchingImageData']:
                    matchingEntry['matchingImageData'].pop('images')

        # return results
        return results

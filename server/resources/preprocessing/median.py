from flask_restful import Resource, reqparse
from processing.preprocessing.median import median
from utils.getNewFilePath import getNewFilePath
import cv2
from os import path

class Median(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('filePath', type=str)
        parser.add_argument('kernelSize', type=int)
        args = parser.parse_args()

        srcPath = args['filePath']
        kernelSize = args['kernelSize']

        srcImage = cv2.imread(srcPath, cv2.CV_8UC1)
        processedImage = median(srcImage, kernelSize)
        newFilePath = getNewFilePath(srcPath, 'preprocessing-median')

        cv2.imwrite(newFilePath, processedImage)

        return {
            'workingImage': srcPath,
            'processedImage': newFilePath
        }

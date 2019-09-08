from flask_restful import Resource, reqparse
from processing.preprocessing.histogramNorm import histogramNorm
from utils.getNewFilePath import getNewFilePath
import cv2
from os import path

class HistogramNorm(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('filePath', type=str)
        args = parser.parse_args()

        srcPath = args['filePath']

        srcImage = cv2.imread(srcPath, cv2.CV_8UC1)
        processedImage = histogramNorm(srcImage)
        newFilePath = getNewFilePath(srcPath, 'preprocessing-histogram')

        cv2.imwrite(newFilePath, processedImage)

        return {
            'workingImage': srcPath,
            'processedImage': newFilePath
        }

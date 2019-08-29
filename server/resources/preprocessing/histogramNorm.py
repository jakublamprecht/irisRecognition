from flask_restful import Resource, reqparse
from processing.preprocessing.histogramNorm import histogramNorm
import cv2
from os import path

class HistogramNorm(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('filePath', type=str)
        args = parser.parse_args()

        srcPath = args['filePath']
        srcFile = cv2.imread(srcPath, cv2.CV_8UC1)
        processedImage = histogramNorm(srcFile)

        fileNameWithExt = path.basename(srcPath)
        fileName, fileExt = path.splitext(fileNameWithExt)
        filePath, dump = path.split(srcPath)
        finalImagePath = path.join(filePath, 'histogramNorm{}'.format(fileExt))
        cv2.imwrite(finalImagePath, processedImage)

        return {
            'workingImage': filePath,
            'processedImage': finalImagePath
        }

from flask_restful import Resource, reqparse
from processing.preprocessing.median import median
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
        srcFile = cv2.imread(srcPath, cv2.CV_8UC1)
        processedImage = median(srcFile, kernelSize)

        fileNameWithExt = path.basename(srcPath)
        fileName, fileExt = path.splitext(fileNameWithExt)
        filePath, dump = path.split(srcPath)
        finalImagePath = path.join(filePath, 'median{}'.format(fileExt))
        cv2.imwrite(finalImagePath, processedImage)

        return {
            'workingImage': filePath,
            'processedImage': finalImagePath
        }

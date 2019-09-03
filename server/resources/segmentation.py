from flask_restful import Resource, reqparse
from processing.preprocessing.gauss import gauss
from utils.getNewFilePath import getNewFilePath
import cv2

class Gauss(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('filePath', type=str)
        parser.add_argument('kernelWidth', type=int)
        parser.add_argument('kernelHeight', type=int)
        parser.add_argument('sigmaX', type=int)
        parser.add_argument('sigmaY', type=int)
        args = parser.parse_args()

        srcPath = args['filePath']
        kernelWidth = args['kernelWidth']
        kernelHeight = args['kernelHeight']
        sigmaX = args['sigmaX']
        sigmaY = args['sigmaY']

        srcImage = cv2.imread(srcPath, cv2.CV_8UC1)
        processedImage = gauss(srcImage, kernelWidth, kernelHeight, sigmaX, sigmaY)
        newFilePath = getNewFilePath(srcPath, 'preprocessing-gauss')

        cv2.imwrite(newFilePath, processedImage)

        return {
            'workingImage': srcPath,
            'processedImage': newFilePath
        }

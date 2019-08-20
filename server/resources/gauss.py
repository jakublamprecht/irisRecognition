from flask_restful import Resource, reqparse
from processing.gauss import gauss
import cv2
from os import path

class Gauss(Resource):
    def get(self):
        # Maybe instead of passing paths we should somehow create some ids and have them passed between processes?
        # we could pass IDs between processes and let python handle the path returning of current image and getting current image

        # How to define the schema for request and response + error handling?
        parser = reqparse.RequestParser()
        parser.add_argument('filePath', type=str)
        parser.add_argument('sigmaX', type=int)
        args = parser.parse_args()

        srcPath = args['filePath']
        sigmaX = args['sigmaX']
        srcFile = cv2.imread(srcPath)
        processedImage = gauss(srcFile, 5, 5, sigmaX, 0)

        fileNameWithExt = path.basename(srcPath)
        fileName, fileExt = path.splitext(fileNameWithExt)
        filePath, dump = path.split(srcPath)
        finalImagePath = path.join(filePath, 'gauss{}'.format(fileExt))
        cv2.imwrite(finalImagePath, processedImage)

        return {'filePath': finalImagePath}

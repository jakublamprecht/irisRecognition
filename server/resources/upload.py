from flask_restful import Resource, reqparse
from utils.generateNewProxyImagePath import generateNewProxyImagePath
import cv2

class Upload(Resource):
    def post(self):
        # possibly add some ID's and return them?
        parser = reqparse.RequestParser()
        parser.add_argument('filePath', type=str)
        args = parser.parse_args()

        filePath = args['filePath']

        image = cv2.imread(filePath, cv2.CV_8UC1)
        newFilePath = generateNewProxyImagePath(filePath)

        cv2.imwrite(newFilePath, image)

        return {
            'image': newFilePath
        }

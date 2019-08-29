from flask_restful import Resource, reqparse
from shutil import copyfile
from uuid import uuid4
from os import path, makedirs
import cv2

class Upload(Resource):
    def post(self):
        # possibly add some ID's and return them?
        parser = reqparse.RequestParser()
        parser.add_argument('filePath', type=str)
        args = parser.parse_args()

        filePath = args['filePath']

        image = cv2.imread(filePath, cv2.CV_8UC1)

        dump, extension = path.splitext(filePath)
        currentDir = path.dirname(__file__)
        id = str(uuid4())
        idDirectory = path.abspath(path.join(currentDir, '..', 'temp', id))
        makedirs(idDirectory)
        fileName = '{}-0{}'.format(id, extension)
        newFilePath = path.join(idDirectory, fileName)

        cv2.imwrite(newFilePath, image)

        return {
            'image': newFilePath
        }

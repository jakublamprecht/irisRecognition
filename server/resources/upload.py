from flask_restful import Resource, reqparse
from shutil import copyfile
from uuid import uuid4
from os import path, makedirs

class Upload(Resource):
    def post(self):
        # possibly add some ID's and return them?
        parser = reqparse.RequestParser()
        parser.add_argument('filePath', type=str)
        args = parser.parse_args()

        filePath = args['filePath']
        dump, extension = path.splitext(filePath)
        currentDir = path.dirname(__file__)
        id = str(uuid4())
        idDirectory = path.join(currentDir, '..', 'temp', id)
        makedirs(idDirectory)
        fileName = '{}-0{}'.format(id, extension)
        newFilePath = path.join(idDirectory, fileName)

        copyfile(filePath, newFilePath)

        return {'STATUS': 'UPLOADED', 'filePath': newFilePath}

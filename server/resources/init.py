from resources.upload import Upload
from resources.preprocessing.resources import addPreprocessingResources

def addResrouces(api):
    api.add_resource(Upload, '/upload')
    addPreprocessingResources(api)

from resources.upload import Upload
from resources.segmentation import Segmentation
from resources.preprocessing.resources import addPreprocessingResources
from resources.normalization.resources import addNormlizationResources
from resources.encoding.resources import addEncodingResources
from resources.matching.resources import addMatchingResources

def addResrouces(api):
    api.add_resource(Upload, '/upload')
    api.add_resource(Segmentation, '/segmentation')
    addPreprocessingResources(api)
    addNormlizationResources(api)
    addEncodingResources(api)
    addMatchingResources(api)

from resources.preprocessing.gauss import Gauss
from resources.preprocessing.median import Median
from resources.preprocessing.histogramNorm import HistogramNorm

def addPreprocessingResources(api):
    api.add_resource(Gauss, '/gauss')
    api.add_resource(Median, '/median')
    api.add_resource(HistogramNorm, '/histnorm')

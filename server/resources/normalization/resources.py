from resources.normalization.daugman import Daugman

def addNormlizationResources(api):
    api.add_resource(Daugman, '/normDaugman')

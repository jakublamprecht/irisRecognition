from resources.matching.matching import Matching

# No hamming resource, since we don't need the preview of the matching
# Matching method and parameters of this method will be saved in processConfig parameter
def addMatchingResources(api):
    api.add_resource(Matching, '/matching')

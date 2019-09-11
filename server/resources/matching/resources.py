from resources.matching.matchingStep import MatchingStep
from resources.matching.matchingBatch import MatchingBatch

# No hamming resource, since we don't need the preview of the matching
# Matching method and parameters of this method will be saved in processConfig parameter
def addMatchingResources(api):
    api.add_resource(MatchingStep, '/matchingStep')
    api.add_resource(MatchingBatch, '/matchingBatch')

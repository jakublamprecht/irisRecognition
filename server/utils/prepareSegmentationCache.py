import sys
import os
import json

currentDir = os.path.dirname(__file__)
dirName = sys.argv[1]

resultsPath = os.path.abspath(os.path.join(currentDir, '..', '..', '..', 'experiment', dirName, 'results.json'))
segmentationResultsPath = os.path.abspath(os.path.join(currentDir, '..', '..', '..', 'experiment', dirName, 'segmentationResults.json'))

with open(resultsPath) as f:
    results = json.load(f)

for path, entry in results.items():
    entry.pop('matchingEntries')

segmentationResultsFile = open(segmentationResultsPath, 'w+')
json.dump(results, segmentationResultsFile)
segmentationResultsFile.close()

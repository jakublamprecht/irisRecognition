import sys
from utils.calcMetrics import calcMetricsForResults

directoryName = sys.argv[1]
metricsResult = calcMetricsForResults(directoryName)

print(metricsResult['FAR'], metricsResult['FRR'])

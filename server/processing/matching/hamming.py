import numpy as np
from utils.image import valueImageToBoolean

"""
Description:
    Calculates Hamming Distance between two bit sequences taking into consideration
    masking bit seqence.

Arguments:
    * testedSeq - bit seqence that is tested - array of 0 and 1
    * testedMaskSeq - bit sequence for noise mask of tested bit sequence
    * modelSeq - bit sequence that tested seq is tested against - array of 0 and 1
    * maskSeq - bit sequence for determining whether to count the difference or not - array of 0 and 1

Returns:
    * HD - hamming distance value (0; 1)
"""

# Shifts by two bits (assuming one Gabor filter is used - if more are used, the sequences
# should be shifted by 2*N where N is the number of used Gabor filters)
def shiftBitSequenceLeft(sequence, bitWidth=2):
    leftShift = np.concatenate((sequence[bitWidth:], sequence[0:bitWidth]))

    return leftShift

def shiftBitSequenceRight(sequence, bitWidth=2):
    rightShift = np.concatenate((sequence[-bitWidth:], sequence[:-bitWidth]))

    return rightShift

def calcHammingDistance(testedSeq, testedMask, modelSeq, modelMask):
    # Masks - 0 refers to masked, insignificant bit, 1 refers to significant bit
    # Bitwise and will create a mask that combines both masked regions
    # Bitwise or would cause the masked regions to be overriden by value '1'
    mask = np.bitwise_and(testedMask, modelMask)
    numberOfCheckedBits = np.sum(mask==True)

    matches = np.count_nonzero(np.bitwise_and(np.bitwise_xor(testedSeq, modelSeq), mask))

    hd = matches / numberOfCheckedBits
    return hd

# From image to Boolean (+ reshape to vector, but im not sure if required)
# Add shifting logic

def calcHammingWithShifts(testedSeq, testedMask, modelSeq, modelMask, shiftsNumber):
    results = []
    testedSeqShiftedLeft = testedSeqShiftedRight = testedSeq.copy()
    testedMaskShiftedLeft = testedMaskShiftedRight = testedMask.copy()

    results.append(calcHammingDistance(testedSeq, testedMask, modelSeq, modelMask))

    if shiftsNumber > 0:
        for i in range(1, shiftsNumber + 1):
            testedSeqShiftedLeft = shiftBitSequenceLeft(testedSeqShiftedLeft)
            testedSeqShiftedRight = shiftBitSequenceRight(testedSeqShiftedRight)
            testedMaskShiftedLeft = shiftBitSequenceLeft(testedMaskShiftedLeft)
            testedMaskShiftedRight = shiftBitSequenceRight(testedMaskShiftedRight)

            results.append(calcHammingDistance(testedSeqShiftedLeft, testedMaskShiftedLeft, modelSeq, modelMask))
            results.append(calcHammingDistance(testedSeqShiftedRight, testedMaskShiftedRight, modelSeq, modelMask))

    return results

def hamming_distance(testedSeq, testedMask, modelSeq, modelMask, shiftsNumber, acceptedHammingDist):
    testedSeq = valueImageToBoolean(testedSeq.flatten())
    testedMask = valueImageToBoolean(testedMask.flatten())
    modelSeq = valueImageToBoolean(modelSeq.flatten())
    modelMask = valueImageToBoolean(modelMask.flatten())

    hammingDistances = calcHammingWithShifts(testedSeq, testedMask, modelSeq, modelMask, shiftsNumber)

    minHammingDistance = np.amin(np.asarray(hammingDistances))

    return {
        'isMatched': bool(minHammingDistance <= acceptedHammingDist),
        'minDistanceValue': minHammingDistance,
        'hammingDistances': hammingDistances,
    }

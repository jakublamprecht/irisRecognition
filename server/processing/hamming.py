import numpy as np

"""
Description:
    Calculates Hamming Distance between two bit sequences taking into consideration
    masking bit seqence.

Arguments:
    * testedSeq - bit seqence that is tested - array of 0 and 1
    * modelSeq - bit sequence that tested seq is tested against - array of 0 and 1
    * maskSeq - bit sequence for determining whether to count the difference or not - array of 0 and 1

Returns:
    * HD - hamming distance value (0; 1)
"""

# TODO: the bit shifts, how to do that and how many of them
# Wonder if these should be bitwise or logical
def hamming_distance(testedSeq, testedMask, modelSeq, modelMask):
    mask = np.bitwise_or(testedMask, modelMask)
    numberOfMaskedBits = np.sum(mask==1)
    numberOfCheckedBits = testedMask.size - numberOfMaskedBits
    # doing a not on mask, because mask has 1, where the area should be masked and not taken into consideration
    matches = np.count_nonzero(np.bitwise_and(np.bitwise_xor(testedSeq, modelSeq), np.bitwise_not(mask)))

    hd = matches / numberOfCheckedBits
    return hd

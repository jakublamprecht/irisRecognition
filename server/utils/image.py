import numpy as np

def valueImageToBoolean(array):
    array = array / 255

    return array.astype(bool)

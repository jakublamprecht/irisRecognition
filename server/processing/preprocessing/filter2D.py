import cv2
import numpy as np

def filter2D(srcImage, kernelSize):
    kernel = np.ones((kernelSize, kernelSize), np.float32)/(kernelSize*kernelSize)

    return cv2.filter2D(srcImage, -1, kernel)

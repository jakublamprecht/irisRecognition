import cv2
import numpy as np

def histogramNorm(srcImage):
    return cv2.equalizeHist(srcImage)

import cv2
import numpy as np

def median(srcImage, kernelSize):
    return cv2.medianBlur(srcImage, kernelSize);

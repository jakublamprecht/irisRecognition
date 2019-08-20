import cv2
import numpy as np

def gauss(srcImage, kernelWidth, kernelHeight, sigmaX, sigmaY):
    return cv2.GaussianBlur(srcImage, (kernelWidth, kernelHeight), sigmaX, sigmaY)

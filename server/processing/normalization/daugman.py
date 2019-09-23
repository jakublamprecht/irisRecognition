import numpy as np
from scipy.interpolate import interp2d
import math as math

"""
Description:
    Function which performs Iris image normalization using Daugmann rubber sheet model,
    which transforms cartesian coordinates (x,y) to polar coordinates (r, theta).
    Accounts for scale and translation differences, pupil dilation and displacement of
    pupil and iris centers, but does not compensate for rotational differences which are
    compensated in the matching process.

Arguments:
    * image - openCv image as numpy array, gray, one channel
    * pupilCenterX, pupilCenterY - coordinates of center point of the pupil circle (smaller circle)
    * irisCenterX, irisCenterY - coordinates of center point of the iris (bigger circle)
    * pupilR - radius of the pupil circle
    * irisR - radius of the iris circle
    * width - desired width of normalized image, defaults to 129
    * height - desired height of normalized image, defaults to 70

Returns:
    * normImage - the normalized image
"""

def normalize_image(image, irisCenterX, irisCenterY, irisR, pupilCenterX, pupilCenterY, pupilR, width, height):
    realHeight = height + 2
    angledivisions = width - 1
    rows, cols = image.shape

    r = np.arange(0, realHeight, 1)
    thetas = np.arange(0, 2*np.pi + 2*np.pi / angledivisions, 2*np.pi / angledivisions)

    ox = pupilCenterX - irisCenterX
    oy = pupilCenterY - irisCenterY

    if ox <= 0:
        sgn = -1
    elif ox > 0:
        sgn = 1

    if ox == 0 and oy > 0:
        sgn = 1

    a = np.ones((1,width)) * (ox*ox + oy*oy)

    if ox == 0:
        phi = np.pi/2
    else:
        phi = math.atan(oy/ox)

    b = sgn * np.cos(np.pi - phi - thetas)

    r = np.multiply(np.sqrt(a), b) + np.sqrt(np.multiply(a, np.power(b, 2)) - (a - np.power(irisR, 2)))
    r = r - pupilR

    rMatrix = np.transpose(np.ones((1, realHeight))) * r
    rMatrix = np.multiply(rMatrix, np.transpose(np.ones((angledivisions+1, 1))*np.arange(0, 1, 1/realHeight)))
    rMatrix = rMatrix + pupilR

    rMatrix = rMatrix[1:(realHeight - 1), :]

    xcosMat = np.ones((height, 1)) * np.cos(thetas)
    xsinMat = np.ones((height, 1)) * np.sin(thetas)

    xo = np.multiply(rMatrix, xcosMat)
    yo = np.multiply(rMatrix, xsinMat)

    xo = pupilCenterX + xo
    yo = pupilCenterY - yo

    xo = xo.astype(int)
    yo = yo.astype(int)

    normImage = np.empty((0, width), np.uint8)
    for i, j in zip(xo, yo):
        normImage = np.vstack((normImage, image[j, i]))

    return normImage

def normalize_daugman(image, mask, irisCenterX, irisCenterY, irisR, pupilCenterX, pupilCenterY, pupilR, width, height):
    normalizedImage = normalize_image(image, irisCenterX, irisCenterY, irisR, pupilCenterX, pupilCenterY, pupilR, width, height)
    normalizedMask = normalize_image(mask, irisCenterX, irisCenterY, irisR, pupilCenterX, pupilCenterY, pupilR, width, height)
    normalizedImageMasked = np.bitwise_and(normalizedImage, normalizedMask)

    return normalizedImage, normalizedMask, normalizedImageMasked

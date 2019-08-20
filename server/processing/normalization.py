import numpy as np
import cv2

"""
Description:
    Function which performs Iris image normalization using Daugmann rubber sheet model,
    which transforms cartesian coordinates (x,y) to polar coordinates (r, theta).
    Accounts for scale and translation differences, pupil dilation and displacement of
    pupil and iris centers, but does not compensate for rotational differences which are
    compensated in the matching process.

Arguments:
    * srcImage - openCv image as numpy array, gray, one channel
    * xcP, ycP - coordinates of center point of the pupil circle (smaller circle)
    * xcI, ycI - coordinates of center point of the iris (bigger circle)
    * rP - radius of the pupil circle
    * rI - radius of the iris circle
    * width - desired width of normalized image, defaults to 129
    * height - desired height of normalized image, defaults to 70

Returns:
    * normImage - the normalized image
"""

# TODO - normalize also the noise/mask image?
def daguman_normalization(srcImage, xcP, ycP, xcI, ycI, rP, rI, width=129, height=70):
    thetas = np.arange(0, 2*np.pi, 2*np.pi / width)
    normImage = np.zeros((height, width, 3), np.uint8)

    for i in range(width)
        for j in range(height)
            theta = thetas[i]
            rNorm = j / height

            # Coordinates of points on the intersetion of pupil and iris circle and line r with theta angle
            xp = xcP + rP * np.cos(theta)
            yp = ycP + rP * np.sin(theta)
            xi = xcI + rI * np.cos(theta)
            yi = ycI + rI * np.sin(theta)

            x = (1 - rNorm) * xp + rNorm * xi
            y = (1 - rNorm) * yp + rNorm * yi

            val = srcImage[int(x)][int(y)]
            normImage[j][i] = val

    return normImage

import numpy as np

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
    thetas = np.arange(0, 2*np.pi, 2*np.pi / width)
    normImage = np.zeros((height, width), np.uint8)

    for i in range(width):
        for j in range(height):
            theta = thetas[i]
            rNorm = j / height

            # Coordinates of points on the intersetion of pupil and iris circle and line r with theta angle
            xp = pupilCenterX + pupilR * np.cos(theta)
            yp = pupilCenterY + pupilR * np.sin(theta)
            xi = irisCenterX + irisR * np.cos(theta)
            yi = irisCenterY + irisR * np.sin(theta)

            x = (1 - rNorm) * xp + rNorm * xi
            y = (1 - rNorm) * yp + rNorm * yi

            val = image.item(int(x), int(y))
            normImage[j][i] = val

    return normImage

def normalize_daugman(image, mask, irisCenterX, irisCenterY, irisR, pupilCenterX, pupilCenterY, pupilR, width, height):
    normalizedImage = normalize_image(image, irisCenterX, irisCenterY, irisR, pupilCenterX, pupilCenterY, pupilR, width, height)
    normalizedMask = normalize_image(mask, irisCenterX, irisCenterY, irisR, pupilCenterX, pupilCenterY, pupilR, width, height)
    normalizedImageMasked = np.bitwise_and(normalizedImage, normalizedMask)

    return normalizedImage, normalizedMask, normalizedImageMasked

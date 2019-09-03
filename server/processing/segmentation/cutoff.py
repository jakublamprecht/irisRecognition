# -*- coding: utf-8 -*-

"""
usuwanie_zaklocen

"""

import cv2
import scipy.ndimage
import glob
import os
import time
import morphsnakes
import numpy as np

#   funkcja odcinajaca - wykonanie maski w ksztalcie wycinkow kola
#   parametry:
#   image - obraz wejsciowy w skali szarosci
#   r1 - promien zrenicy
#   r2 - promien teczowki
#   cx, cy - srodek zrenicy, koordynata x i y
#   angle - kat w stopniach pomiedzy dwoma prostymi odcinajacymi 
def radialCutoff(image,r1,r2,cx,cy,angle):
    mask = np.zeros(image.shape,np.uint8)
    rows,cols = image.shape

    theta = (angle/2)*np.pi/180
    radius = int((r1+r2)/2)
    x_right = cols
    y_right_up = int(cy-(cols-cx)*np.tan(theta))
    y_right_down = int(cy+(cols-cx)*np.tan(theta))

    x_left = 0
    y_left_up = int(cy-cx*np.tan(theta))
    y_left_down = int(cy+cx*np.tan(theta))

    a1 = float(y_right_up-y_left_down)/(0+cols)
    b1 = a1*0+y_left_down

    a2 = float(y_right_down-y_left_up)/(0+cols)
    b2 = a2*0+y_left_up

    for i in range (cols):
        for j in range (rows):
            if (i>=cx and j >= a1*i+b1 and j<=a2*i+b2):
                mask[j,i] = 255
            elif(i<cx and j< a1*i+b1 and j>a2*i+b2):
                mask[j,i]=255
    cv2.circle(mask,(cx,cy),radius,255,-1)
    mask=cv2.bitwise_and(mask,image)
    return mask


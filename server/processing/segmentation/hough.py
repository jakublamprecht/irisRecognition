import numpy as np
import cv2
import math
from itertools import chain

def detect_inner_circle(image, canny_param=20, hough_param=20):
    """
    Detecting inner iris circle after filtering
    :param img: image
    :param canny_param: higher threshold for canny edge detector
    :param hough_param: threshold parameter for Hough circle transform
    :return: one cirlcle
    """
    if image.ndim == 3:
        cimg = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    else:
        cimg = image

    ret,thresh = cv2.threshold(cimg,0.41*255,255,cv2.THRESH_BINARY)
    h,w = thresh.shape
    mask = np.zeros((h+2, w+2), np.uint8)
    cv2.floodFill(thresh, mask, (0,0), 255)
    sobelx = cv2.Sobel(thresh,cv2.CV_64F,1,0,ksize=5)
    sobely = cv2.Sobel(thresh,cv2.CV_64F,0,1,ksize=5)
    abs_sobelx = cv2.convertScaleAbs(sobelx)
    abs_sobely = cv2.convertScaleAbs(sobely)
    sobel_done = cv2.addWeighted(abs_sobelx,0.5,abs_sobely,0.5,0)
    ret,Igb = cv2.threshold(sobel_done,0.9*255,255,cv2.THRESH_BINARY)
    circles = cv2.HoughCircles(Igb, cv2.HOUGH_GRADIENT, 1, 20,
                              param1=canny_param,
                              param2=hough_param,
                              minRadius=20,maxRadius=80)
    #for i in range(circles.shape[1]):
    #    cv2.circle(cimg,(circles[0][i][0],circles[0][i][1]),circles[0][i][2],255,2)
    #    cv2.imshow('o',cimg)
    #    cv2.waitKey(0)
    inner_circle = [0, 0, 0]
    if circles is not None:
        inner_circle = np.uint16(np.around(circles[0][0])).tolist()

    return inner_circle

def detect_outer_circle(image,pupil_center,pupil_radius):
    #cimg = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    #hist_equalized=cv2.equalizeHist(cimg)
    #blurred = cv2.GaussianBlur(hist_equalized,(17,17),1.0)
    #alpha = 2.5
    #beta = 1
    #for y in range(blurred.shape[0]):
    #    for x in range(blurred.shape[1]):
    #            blurred[y,x] = np.clip(alpha*blurred[y,x] + beta, 0, 255)
    #cv2.imshow('o',blurred)
    #cv2.waitKey(0)
    #sobelx = cv2.Sobel(blurred,cv2.CV_64F,1,0,ksize=5)
    #sobely = cv2.Sobel(blurred,cv2.CV_64F,0,1,ksize=5)
    #abs_sobelx = cv2.convertScaleAbs(sobelx)
    #abs_sobely = cv2.convertScaleAbs(sobely)
    #sobel_done = cv2.addWeighted(abs_sobelx,0.5,abs_sobely,0.5,0)
    #ret,Igb = cv2.threshold(sobel_done,0.9*255,255,cv2.THRESH_BINARY)
    #cv2.imshow('o',Igb)
    #cv2.waitKey(0)
    #h,w = cimg.shape
    #mask = np.zeros((h+2, w+2), np.uint8)
    #cv2.floodFill(sobel_done, mask, (200,200), 255)
    #cv2.imshow('o',sobel_done)
    #cv2.waitKey(0)
    #circles = cv2.HoughCircles(sobel_done, cv2.HOUGH_GRADIENT,1,1,minRadius=50,maxRadius=140)
    #print(circles)
    #for i in range(circles.shape[1]):
    #    cv2.circle(sobel_done,(circles[0][i][0],circles[0][i][1]),circles[0][i][2],0,2)
    #    cv2.imshow('o',sobel_done)
    #    cv2.waitKey(0)

    if image.ndim == 3:
        cimg = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    else:
        cimg = image

    hist_equalized=cv2.equalizeHist(cimg)
    blurred = cv2.GaussianBlur(hist_equalized,(3,3),0.5)
    alpha = 2.5
    beta = 1
    for y in range(blurred.shape[0]):
        for x in range(blurred.shape[1]):
                blurred[y,x] = np.clip(alpha*blurred[y,x] + beta, 0, 255)
    sobelx = cv2.Sobel(blurred,cv2.CV_64F,1,0,ksize=5)
    sobely = cv2.Sobel(blurred,cv2.CV_64F,0,1,ksize=5)
    abs_sobelx = cv2.convertScaleAbs(sobelx)
    abs_sobely = cv2.convertScaleAbs(sobely)
    sobel_done = cv2.addWeighted(abs_sobelx,0.5,abs_sobely,0.5,0)
    ret,Igb = cv2.threshold(sobel_done,0.9*255,255,cv2.THRESH_BINARY)

    max_diff=0
    w=15
    irmin = 80
    irmax= 115
    alpha_range = chain(range(-45,30), range(150, 225))

    irx = 0
    iry = 0
    ir = 0

    for x in range(pupil_center[0]-7,pupil_center[0]+7):
        for y in range(pupil_center[1]-7,pupil_center[1]+7):
            prev_sum= 0
            start_flag=1
            for r in range(irmin,irmax):
                csum = 0
                for alpha in alpha_range:
                    csum = csum + Igb[x-int(r*np.sin(alpha*np.pi/180))][y + int(r*np.cos(alpha*np.pi/180))]
                diff_sum = csum-prev_sum
                prev_sum = csum
                if(diff_sum>=max_diff and start_flag == 0):
                    if((x+r)<320 and (y+r)<280):
                        irx = x
                        iry = y
                        ir = r
                start_flag=0
    outer_circle= [irx,iry,ir]
    print(outer_circle)
    if outer_circle is not None:
        return outer_circle

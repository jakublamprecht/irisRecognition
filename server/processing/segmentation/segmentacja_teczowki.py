import numpy as np
import cv2
import scipy.ndimage
import glob
import os
import time

import processing.segmentation.morphsnakes as morphsnakes
import processing.segmentation.cutoff as cutoff
import processing.segmentation.parabolas as parabolas
import processing.segmentation.lines as lines
import processing.segmentation.daugman as daugman
import processing.segmentation.hough as hough

#####   Funkcja skalująca  #####
#       przyjmuje argumenty:
#       imgEyeIris  - obraz wejsciowy tęczówki
#       imgEyePupil  - obraz wejsciowy źrenicy
#       scale - zastosowana skala
def imageScale(imgEyeIris, imgEyePupil, scale):
    #sprawdzenie wartości argumentu skalującego
    if (scale != 1.0):
        imgResizedIris = cv2.resize(imgEyeIris,
                                    None,
                                    fx=scale,
                                    fy=scale,
                                    interpolation=cv2.INTER_CUBIC)

        imgResizedPupil = cv2.resize(imgEyePupil,
                                    None,
                                    fx=scale,
                                    fy=scale,
                                    interpolation=cv2.INTER_CUBIC)

    else:
        imgResizedIris = imgEyeIris
        imgResizedPupil = imgEyePupil

    return imgResizedIris, imgResizedPupil

#####   Funkcja znajdująca i odcinająca powieki (linia prosta)  #####
#       przyjmuje argumenty:
#       imgSrcMask  - obraz wejsciowy do maski
#       center - punkty środka źrenicy
#       radius - promień źrenicy
#       circlePoints - liczba punktów zbierana z granicy
#       xIrisCenter,yIrisCenter - punkty środka tęczówki
#       RIris - promień tęczówki
def imageMask(imgSrcMask, center, radius, yIrisCenter, xIrisCenter, RIris):
    rows, cols = imgSrcMask.shape[:2] #zdjecie wymiarów obrazu wejsciowego
    mask = np.full((rows, cols), 0, dtype=np.uint8)  #stworzenie maski

    #rysowanie teczowki
    cv2.circle(mask, (yIrisCenter, xIrisCenter), RIris, (255, 255, 255), -1)

    #rysowanie źrenicy
    cv2.circle(mask, center, radius, (0, 0, 0), -1)

    #tworzenie obrazu z zastosowaniem maski
    fg = cv2.bitwise_or(imgSrcMask, imgSrcMask, mask=mask)

    return fg


#####   Funkcja generująca wyniki dla jednego obrazu #####
#       przyjmuje argumenty:
#       imgEye  - obraz wejsciowy
#       params - parametry
#           params[0] -> skala obrazu
#           params[1] -> minimalny promien
#           params[2] -> maksymalny promien
#           params[3] -> liczba punktów granicy tęczówki
#           params[4] -> dodatkowe przeszukiwanie w osiach x,y o daną wartość pikseli
#           params[5] -> wybrana metoda szukania powiek
#           params[6] -> metoda segmentacji: Daugman , ActiveContours , Hough
def onePhotoExecution(imgEye, params):
    #przypisanie parametów do zmiennych
    scale = params[0]
    rmin = params[1]
    rmax = params[2]
    numberOfPoints = params[3]
    searchPixels = params[4]
    noiseMethod = params[5]
    segMethod = params[6]

    rminScaled = int(rmin * scale)
    rmaxScaled = int(rmax * scale)

    imgEyeGrey = imgEye.copy() #konwersja obrazu do odcieni szarosci
    imgSrc = imgEye.copy() #wykonanie kopii oryginalnego obrazu
    imgIrisPupil = imgEye.copy() #wykonanie kopii oryginalnego obrazu
    imgSrcMask = imgEye.copy() #wykonanie kopii oryginalnego obrazu
    imgSrcGrey = imgEyeGrey.copy()

    kernelSr2 = np.ones((5, 5), np.float32) / 17
    kernelSr = np.ones((5, 5), np.float32) / 25
    #przygotowanie obrazów dla metody parabol
    if(noiseMethod == 'parabolicApproximation'):
        imgSrcParabole = imgEye.copy() #wykonanie kopii oryginalnego obrazu

        #przygotowanie obrazu do szukania punktów powieka górna (metoda paraboli)
        imgEyeReadyFindPoints = cv2.medianBlur(imgEyeGrey,11)
        imgEyeReadyFindPoints = cv2.filter2D(imgEyeReadyFindPoints, -1, kernelSr2)

        #przygotowanie obrazu do szukania punktów powieka dolna (metoda paraboli)
        imgParaboleBottom = cv2.filter2D(imgEyeGrey, -1, kernelSr2)
        imgEyeGreyIrisTemp = cv2.equalizeHist(imgEyeGrey)
        imgEyeReadyIris = cv2.filter2D(imgEyeGreyIrisTemp, -1, kernelSr)

####################    SEGMENTACJA     #####################
    if(segMethod == "Daugman"):

        #preprocessing
        kernelSr = np.ones((5, 5), np.float32) / 25

        #przygotowanie obrazu do szukania tęczówki (środek i promień)
        imgEyeGreyIrisTemp = cv2.equalizeHist(imgEyeGrey)
        imgEyeReadyIris = cv2.filter2D(imgEyeGreyIrisTemp, -1, kernelSr)

        #przygotowanie obrazu do szukania źrenicy (środek i promień)
        imgEyeReadyPupil = cv2.filter2D(imgEyeGrey, -1, kernelSr)

        #skalowanie obrazu
        imgResizedIris, imgResizedPupil = imageScale(imgEyeReadyIris, imgEyeReadyPupil, scale)

        #znajdowanie parametrów źrenicy punkty środka i promień
        center, radius = daugman.findPupilBoundary(imgEyeReadyPupil)


        #zastosowanie skalowania dla znalezionych parametów (wyszukiwanie parametrów źrenicy odbywa się na obrazie bez skalowania)
        x_pup_center = int(center[0] * scale)
        y_pup_center = int(center[1] * scale)


        #szukanie parametrów opisujących tęczówkę
        xIrisCenterScaled, yIrisCenterScaled, RIrisScaled = daugman.searchIrisBoundary(imgResizedIris, rminScaled, rmaxScaled, int(y_pup_center),
                                int(x_pup_center),numberOfPoints,searchPixels,0.5)


        #skalowanie parametów opisujących tęczówkę (z metody otrzymywane są z obrazu po skalowaniu)
        xIrisCenter = int(xIrisCenterScaled / scale)
        yIrisCenter = int(yIrisCenterScaled / scale)
        RIris = int(RIrisScaled / scale)

    elif(segMethod == "ActiveContours"):

        iris_left = -1
        iris_right = -1
        iris_up = -1
        iris_down = -1

        pupil_left = -1
        pupil_right = -1
        pupil_up = -1
        pupil_down = -1

    # Ladowanie obrazow
        img = imgEye.copy()

        if img.ndim == 3:
            img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        else:
            img_gray = img

        raw_img = imgEye.copy()
        raw_img_gray = img_gray.copy()
        # kopie obrazu oryginalnego

        cx,cy,max_t = morphsnakes.findPupilBoundary_AverageDarkPix(img_gray)

        iris_bw = np.zeros(img_gray.shape,np.uint8)
        pupil_bw = np.zeros(img_gray.shape,np.uint8)

        iris_bw,iris_down, iris_up, iris_right,iris_left=morphsnakes.test_iris(img_gray,cx,cy,max_t)
        pupil_bw,pupil_down,pupil_up,pupil_left,pupil_right=morphsnakes.test_pupil(img_gray,cx,cy,max_t)

    #sprawdzenie czy segmentacja poszla dobrze, jesli nie to ustawienie samemu

    #jesli pojechalo zbyt daleko w lewo to lewa granica iris jest skraca o roznice po obu stronach
        if (pupil_left - iris_left) > 1.2*(iris_right - pupil_right):
            iris_left = iris_left + int((pupil_left - iris_left)-(iris_right - pupil_right))
    #jesli pojechalo zbyt daleko w prawo to prawa granica iris jest skraca o roznice po obu stronach
        elif (iris_right - pupil_right) > 1.2*(pupil_left - iris_left):
            iris_right = iris_right - int((iris_right - pupil_right)-(pupil_left - iris_left))

    #mozliwe promienie elipsy teczowki
        iris_radius = [0,0,0,0]
        iris_radius[0] = abs(iris_right-cx)
        iris_radius[1] = abs(cx-iris_left)
        iris_radius[2] = abs(cy-iris_up)
        iris_radius[3] = abs(iris_down - cy)

    #dopasowanie elipsy teczowki
        mask = np.zeros(img_gray.shape,np.uint8)
        cv2.ellipse(mask,(cx,cy),(min(iris_radius[0],iris_radius[1]),max(iris_radius[2],iris_radius[3])),0,0,360,255,-1)

    #mozliwe promienie elipsy zrenicy
        pupil_radius = [0,0,0,0]
        pupil_radius[0] = abs(pupil_right-cx)
        pupil_radius[1] = abs(cx-pupil_left)
        pupil_radius[2] = abs(cy-pupil_up)
        pupil_radius[3] = abs(pupil_down - cy)

    #dopasowanie elipsy zrenicy
        pupil_mask = np.zeros(img_gray.shape,np.uint8)
        cv2.ellipse(pupil_mask,(cx,cy),(min(pupil_radius[0],pupil_radius[1]),max(pupil_radius[2],pupil_radius[3])),0,0,360,255,-1)
        pupil_mask=cv2.bitwise_not(pupil_mask)

    #polaczenie dwoch masek
        mask=cv2.bitwise_and(mask,pupil_mask)
        #cv2.imshow("okno",mask)
        #cv2.waitKey(0)
    #obraz koncowy
        seg = mask
        segPreview = cv2.bitwise_and(mask, raw_img_gray)

        xIrisCenter = cx
        yIrisCenter = cy
        RIris = int((max(iris_radius)+min(iris_radius))/2)
        center = (cx,cy)
        radius = min(pupil_radius)

    elif(segMethod == "Hough"):
        pupil_circle = hough.detect_inner_circle(imgEye)
        center = (pupil_circle[0],pupil_circle[1])
        radius = pupil_circle[2]

        iris_circle = hough.detect_outer_circle(imgEye,center,radius)
        yIrisCenter = iris_circle[0]
        xIrisCenter = iris_circle[1]
        RIris = iris_circle[2]


################## USUWANIE ZAKLOCEN  #########################

    #metoda punktów przecinających
    if(noiseMethod == 'commonPoints'):
        commonPointsMask = lines.eyelidDetection(imgEyeGrey,xIrisCenter,yIrisCenter,RIris,100)

        if(segMethod == 'Daugman'or segMethod == 'Hough'):
            maska = imageMask(commonPointsMask,center,radius,yIrisCenter,xIrisCenter,RIris)
        if(segMethod == 'ActiveContours'):
            maska = cv2.bitwise_or(commonPointsMask,commonPointsMask,mask=seg)

    #metoda przybliżenia powiek za pomocą funkcji parabolicznych
    elif(noiseMethod == 'parabolicApproximation'):
        #gorna powieka wykrywanie za pomoca paraboli
        pL, pR, iN,imgParaboleEdited = parabolas.generateEdgelsTop(imgEyeReadyFindPoints,xIrisCenter,yIrisCenter,RIris,imgEyeReadyIris)
        aTop, bTop, cTop = parabolas.parabolicCurveTop(imgParaboleEdited,yIrisCenter,xIrisCenter,RIris,pL,pR,iN)

        #dolna powieka wykrywanie za pomoca paraboli
        parabolaValues, iNd = parabolas.generateEdgelsBottom(imgParaboleBottom,xIrisCenter,yIrisCenter,RIris)
        aBot, bBot, cBot = parabolas.parabolicCurveBottom(imgParaboleBottom,yIrisCenter,xIrisCenter,RIris,parabolaValues,iNd)

        imgSrcParabole = parabolas.rysujParaboleMask(imgSrcParabole,aTop,bTop,cTop,aBot,bBot,cBot)

        if(segMethod == 'Daugman' or segMethod == 'Hough'):
            maska = imageMask(imgSrcParabole,center,radius,yIrisCenter,xIrisCenter,RIris)
        if(segMethod == 'ActiveContours'):
            maska = cv2.bitwise_or(imgSrcParabole,imgSrcParabole,mask=seg)

    #metoda odcinajaca z dwoch kol
    elif(noiseMethod == 'radialCutoff'):
        wynik = cutoff.radialCutoff(imgEyeGrey,radius,RIris,center[0],center[1],60)

        if(segMethod == 'Daugman' or segMethod == 'Hough'):
            maska = imageMask(wynik,center,radius,yIrisCenter,xIrisCenter,RIris)
        if(segMethod == 'ActiveContours'):
            maska = cv2.bitwise_or(wynik,wynik,mask=seg)

    elif(noiseMethod == 'none'):
        rows, cols = imgSrc.shape[:2]
        emptyMask = np.full((rows, cols), 255, dtype=np.uint8)

        if(segMethod == 'Daugman' or segMethod == 'Hough'):
            maska = imageMask(emptyMask,center,radius,yIrisCenter,xIrisCenter,RIris)
        if(segMethod == 'ActiveContours'):
            maska = seg

    maskaPreview = cv2.bitwise_and(imgSrc, maska)

    irisCenterX = xIrisCenter
    irisCenterY = yIrisCenter
    irisR = RIris

    pupilCenterX = center[0]
    pupilCenterY = center[1]
    pupilR = radius

    return irisCenterX, irisCenterY, irisR, pupilCenterX, pupilCenterY, pupilR, maska, maskaPreview

###########################################################
###########################################################
######## WYWOLYWANIE FUNKCJI WYKONUJĄCEJ ##################

# segmentationMethod - one of: [Daugman, ActiveContours, Hough]
# noiseMethod - one of: [parabolicApproximation, commonPoints, radialCutoff, none]

def segmentation(filePath, segmentationMethod, noiseMethod):
    scale = 0.5 #skalowanie obrazu
    rmin = 90 #minimalna wartosc poszukiwan promienia
    rmax = 130 #maksymalna wartosc poszukiwan promienia
    integralPoints = 400 #liczba punktów które wyznaczaja granicę tęczówki
    searchingRange = 4 #granice przeszukiwania punktu środka tęczówki od znalezionego środka źrenicy +- na osi x i y

    irisCenterX, irisCenterY, irisR, pupilCenterX, pupilCenterY, pupilR, maska, maskaPreview = onePhotoExecution(
        filePath,
        [scale, rmin, rmax, integralPoints, searchingRange, noiseMethod, segmentationMethod]
    )

    segmentationResults = {
        'irisCenterX': irisCenterX,
        'irisCenterY': irisCenterY,
        'irisR': irisR,
        'pupilCenterX': pupilCenterX,
        'pupilCenterY': pupilCenterY,
        'pupilR': pupilR,
    }

    return segmentationResults, maska, maskaPreview

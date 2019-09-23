import cv2
import numpy as np
import scipy.ndimage

#####   Funkcja znajdująca środek i promień źrenicy  #####
#Funkcja działa na zasadzie znajdowania konturów na sprogowanym obrazie.
#Po znalezieniu odpowiedniego konturu następuje wyznaczenie minimalnego okręgu opisującego dany kształt.
#       przyjmuje argumenty:
#       img  - obraz wejsciowy
def findPupilBoundary(img):
    areaArray = [] #tworzenie zmiennej dla powierzchni konturow
    te, edged = cv2.threshold(img, 70, 255, 0) #progowanie wczytanego obrazu w celu uzyskania obrazu zrenicy
    #cv2.imshow('wynik edge', edged) #wyswietlenie uzyskanego po progowaniu obrazu

    #wyszukiwanie konturow na obrazie po progowaniu
    contours, hier = cv2.findContours(edged.copy(), cv2.RETR_TREE,
                                      cv2.CHAIN_APPROX_SIMPLE)

    for i, c in enumerate(contours):
        area = cv2.contourArea(c)
        areaArray.append(area)

    #sortowanie wzgledem wielkosci pola powierzchni
    sortedData = sorted(zip(areaArray, contours),
                        key=lambda x: x[0],
                        reverse=True)

    #szukanie drugiego najwiekszego pola ([n-1][1], w tym przypadku drugie najwiekszy 2)
    secondlargestcontour = sortedData[1][1]

    #wyznaczanie minimalnego okręgu opisującego dany kontur źrenicy.
    #Z tak wyznaczonego okręgu uzyskiwane są wartości środka i promienia
    (x_pup_cen, y_pup_cen), radius = cv2.minEnclosingCircle(secondlargestcontour)
    center = (int(x_pup_cen), int(y_pup_cen))
    radius = int(radius)
    return center, radius

#####   Funkcja szukajaca granicy teczowki   #####
#       przyjmuje argumenty:
#       img  - obraz
#       rmin - minimalna wartosc promienia
#       rmax - maksymalna wartosc promienia
#       x,y  - zakladany srodek teczowki
#       circlePoints - liczba punktow wykorzystywanych do liczenia calki
#       sigmaValue - ustala wartosc sigmy
def searchIrisBoundary(img, rmin, rmax, x, y, circlePoints, searchPixels, sigmaValue):
    rows, cols = img.shape[:2] #zbieranie wymiarow obazu wejsciowego
    #rVector = np.arange(rmin, rmax, 1) #tworzenie kontenera przechowujacego wartosci promieni
    maxrad = np.zeros((rows, cols))
    maxb = np.zeros((rows, cols))

    #przeszukiwanie zadanego obszaru pikseli w celu znalezienia optymalnego srodka i promienia
    for i in range(x - searchPixels, x + searchPixels):
        for j in range(y - searchPixels, y + searchPixels):

            rVector = np.arange(rmin, rmax, 1) #tworzenie kontenera przechowujacego wartosci promieni
            rVectorLength = rVector.size #ustalanie wielkosci wektora
            iterationsResults = []  #inicjalizacja pustej zmiennej do ktorej beda dodawane kolejne wyniki w kolejnych iteracjach
            #iterowanie po całej rozpiętości wartości promieni
            for k in range(1, rVectorLength):
                res_f = irisBoundaryIntegral(img, i, j, rVector[k], circlePoints)
                if res_f != 0:
                    iterationsResults.append(res_f)

            diffResult = np.diff(iterationsResults)


            afterGaussianFilter = scipy.ndimage.filters.gaussian_filter1d(diffResult, sigmaValue) #zastosowanie filtra na wektorze (Gauss)
            absAfterGaussianFilter = abs(afterGaussianFilter) #wartość bezwzględna

            #sprawdzenie czy wektor nie jest pusty. Jeśli nie to szukany jest indeks maksymalnej wartości i odczytywana jest odpowiadająca mu wartość promienia.
            if(len(absAfterGaussianFilter) != 0):
                maximumRadiusIndex = np.where(absAfterGaussianFilter == absAfterGaussianFilter.max())
                maxrad[i, j] = rVector[maximumRadiusIndex]
                maxb[i, j] = absAfterGaussianFilter[maximumRadiusIndex]
            else:
                maxrad[i, j] = 0
                maxb[i, j] = 0


    bestXcoord, bestYcoord = np.unravel_index(maxb.argmax(), maxb.shape) #odczytanie optymalnych punktow srodka
    trueRadius = maxrad[bestXcoord, bestYcoord] #znalezienie optymalnego promienia odpowiadajacego uzyskanym punktom srodka

    return [bestXcoord, bestYcoord, trueRadius]

#####   Funkcja oblicajaca wartosc pikseli w granicy (całkowanie)  #####
#       przyjmuje argumenty:
#       img  - obraz wejsciowy
#       x,y  - zakladany srodek teczowki
#       r - obecnie rozpatrywany promień
#       circlePoints - liczba punktow wykorzystywanych do liczenia calki
def irisBoundaryIntegral(img, x, y, r, circlePoints):
    rows, cols = img.shape[:2] #zbieranie wymiarow obazu wejsciowego
    sumOfPixels = 0 #stworzenie zmiennej przechowujacej sume zliczonych wartosci pikseli
    theta = (2 * np.pi) / circlePoints #wyznaczanie ziarna kata z ktorym wyznaczane beda kolejne wartosci
    angle = np.arange(theta, 2 * np.pi, theta) #wyznaczanie wektora wartosci katow do 2pi z ziarnem theta

    #wyznaczanie punktow z zakladanej granicy teczowki
    xPoints = x - r * np.sin(angle)
    yPoints = y + r * np.cos(angle)

    #wyznaczanie wartosci maksymalnych dla punktow w osiach x i y
    xMaximumValue = np.amax(xPoints)
    yMaximumValue = np.amax(yPoints)

    #wyznaczanie wartosci minimalnych dla punktow w osiach x i y
    xMinimumValue = np.amin(xPoints)
    yMinimumValue = np.amin(yPoints)

    #sprawdzenie czy wyznaczone wartosci maksymalne i minimalne nie przekraczaja rozmiaru obrazu
    # wejsciowego w osi x lub y. w przypadku przekroczenia tych wartosci jest to równoznaczne z tym,
    #  że dana granica wykracza poza granicę obrazu. Dalsze rozpatrywanie jest przerywane.
    if xMaximumValue >= (rows - 1) or yMaximumValue >= (cols - 1) or xMinimumValue < 1 or yMinimumValue < 1:
        return 0


    #sumowanie punktów w określonych obszarach granicy. Wartość danego piksela jest odczytywana z obrazu za pomocą odpowiadających wartości z wektorów x i y.
    for i in range(1, int(np.round(circlePoints / 8)), 1):
        val = img[int(np.round(xPoints[i])), int(np.round(yPoints[i]))]
        sumOfPixels = sumOfPixels + val

    for i in range(int(np.round(3 * circlePoints / 8) + 1), int(np.round(5 * circlePoints / 8)), 1):
        val = img[int(np.round(xPoints[i])), int(np.round(yPoints[i]))]
        sumOfPixels = sumOfPixels + val

    for i in range(int(np.round(7 * circlePoints / 8) + 1), circlePoints - 1, 1):
        val = img[int(np.round(xPoints[i])), int(np.round(yPoints[i]))]
        sumOfPixels = sumOfPixels + val

    return (2 * sumOfPixels) / circlePoints


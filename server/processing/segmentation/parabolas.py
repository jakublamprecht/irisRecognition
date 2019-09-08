import cv2
import numpy as np
import scipy.ndimage
#####   Funkcja wyznaczająca punkty w danych granicach spełniające warunki do bycia granicą górnej powieki #####
#       przyjmuje argumenty:
#       img  - obraz wejsciowy
#       xCenter, yCenter - wsp. środka
#       r - promień
def generateEdgelsTop(img,yCenter,xCenter,r,imgEyeReadyIris):
    rows, cols= img.shape[:2] #zgarnięcie wymiarów obrazu
    indexValuesLeft = []
    indexValuesRight = []
    indexNumber = []

    # startIndex = 15
    # endIndex = int(rows-15)
    # maxY = int(xCenter+r/2)
    # minY = 0
    # endXLeft = int(yCenter-r/2)
    # minXRight =int(yCenter+r/2)

    startIndex = 40 #początkowa kolumna (lewa strona)
    endXLeft = int(xCenter-r/2) #koncowa kolumna (lewa strona)

    minXRight =int(xCenter+r/2) #poczatkowa kolumna (prawa strona)
    endIndex = cols - 30 #koncowa kolumna (prawa strona)

    minY = 0 #poczatkowy wiersz
    maxY = int(yCenter+r/2) #koncowy wiersz

    #lewa strona generowanie punktów
    for i in range(startIndex, endXLeft ):
        oneLineVals = []
        for j in range(minY,maxY):
            oneLineVals.append(img[int(j),int(i)])

        afterFilter = scipy.ndimage.filters.gaussian_filter1d(oneLineVals, 3) #filtr
        afterFilter = afterFilter*1.0
        diffResult = np.diff(afterFilter) #wyznaczanie roznicy

        if(len(diffResult) != 0):
            maxDiffValIndex = np.where(diffResult == diffResult.max()) #indeks maksymalnej zmiany (gradient)
            indexValuesLeft.append(maxDiffValIndex[0][0]) #dodanie punktu dla danej wartosci x



    #prawa strona generowanie punktów
    for i in range(minXRight, endIndex):
        oneLineVals = []
        for j in range(minY,maxY):
            oneLineVals.append(img[int(j),int(i)])

        afterFilter = scipy.ndimage.filters.gaussian_filter1d(oneLineVals,3) #filtr 6
        afterFilter = afterFilter*1.0
        diffResult = np.diff(afterFilter) #wyznaczanie roznicy
        if(len(diffResult) != 0):
            maxDiffValIndex = np.where(diffResult == diffResult.max())
            indexValuesRight.append(maxDiffValIndex[0][0]) #indeks maksymalnej zmiany (gradient)
        indexNumber.append(i) #dodanie punktu dla danej wartosci x

    # imgEyeReadyIris = imgEyeReadyIris - 20
    imgEyeReadyIris[imgEyeReadyIris > 10] = 0
    #rysowanie punktów na obrazie lewa strona
    for k in range (startIndex, len(indexValuesLeft)+startIndex):
        cv2.circle(imgEyeReadyIris, (k,indexValuesLeft[k-startIndex]), 2, (255, 255, 255), -1)

    #rysowanie punktów na obrazie prawa strona
    for l in range (0, len(indexValuesRight)):
            cv2.circle(imgEyeReadyIris, (indexNumber[l],indexValuesRight[l]), 2, (255, 255, 255), -1)

    return indexValuesLeft , indexValuesRight, indexNumber, imgEyeReadyIris


#####   Funkcja wyznaczająca paramety paraboli opisującej górną powiekę #####
#       przyjmuje argumenty:
#       img  - obraz wejsciowy
#       xCenter, yCenter - wsp. środka
#       r - promień
#       pntsL, pntsR - wektory punktów z lewej i prawej strony środka
#       indNums - liczba wszystkich punktów (pntsL i pntsR)
def parabolicCurveTop(img,xCenter,yCenter,r, pntsL, pntsR, indNums):
    fMaxVal = -10000 # początkowa wartość wskaźnika
    globalA = 0 # początkowa wartość globalna parametru A
    globalB = 0 # początkowa wartość globalna parametru B
    globalC = 0 # początkowa wartość globalna parametru C
    stepA = 0.002 # krok poszukiwania parametru A
    stepB = 3 # krok poszukiwania parametru B
    stepC = 3 # krok poszukiwania parametru C
    a = stepA # przypisanie początkowej wartości parametrowi A
    b = xCenter - r/2 # przypisanie początkowej wartości parametrowi B
    c = yCenter - 3*r/2 # przypisanie początkowej wartości parametrowi C
    err = 0.4 # parametr określający stosunek punktów poprawnych (mieszczących się w przedziale) do wszystkich
    pointsSum = len(pntsL) + len(pntsR) #liczba wszystkich punktów
    #1/(2*r)

    #iteracja po wartościach parametru A co dany krok
    while (a < 1/(2*r)):
        #(xCenter+r/2)
        # iteracja po wartościach parametru B co dany krok
        while (b < (xCenter+r/2)):
            #(yCenter + 2*r/3)
            pixelSumResult = []
            parameterValuesC = []

            #iteracja po wartościach parametru C co dany krok
            while (c<(yCenter + 2*r/3)):
                number = 0 #zmienna do zliczania liczby punktów znajdujących się w przedziale
                #iteracja po wszystkich punktach i sprawdzanie jego odległości od paraboli
                for i in range(0, pointsSum):
                    if(i < len(pntsL)):
                        distance = abs(pntsL[i]-(a*((i-b)**2)+c))
                    else:
                        distance = abs(pntsR[i-len(pntsL)]-(a*((indNums[i-len(pntsL)]-b)**2)+c))
                    #sprawdzenie warunku odległości między punktami
                    if(distance < 6):
                        number = number + 1

                #sprawdzenie warunku, czy stosunek pozytywnie rozpatrzonych punktów jest większy od ustalonej wartości
                if (float(number/pointsSum) > err):
                    tempVal = parabolicCurveSumPoints(img,a,b,c,xCenter,yCenter,r) #wyznaczanie wartości pikseli dla danych parametrów (a,b,c)
                    pixelSumResult.append(tempVal) #dodanie otrzymanej wartości do listy
                    parameterValuesC.append(c)

                c = c + stepC # zwiększenie wartości parametru C

            # diffResult = np.diff(pixelSumResult)
            diffResult = pixelSumResult
            afterGaussianFilter = scipy.ndimage.filters.gaussian_filter1d(diffResult, 0.5) #filtracja
            absAfterGaussianFilter = abs(afterGaussianFilter) #wartosc bezwzgledna

            #sprawdzenie czy wektor nie jest pusty
            if(len(absAfterGaussianFilter) != 0):
                maxValIndex = np.where(absAfterGaussianFilter == absAfterGaussianFilter.max())
                bestC = parameterValuesC[maxValIndex[0][0]]
                maxVal = absAfterGaussianFilter[maxValIndex[0][0]]
            else:
                maxVal = -10000

            #sprawdzenie czy otrzymany wynik jest lepszy od globalnego (otrzymanego dla innych wartości parametrów)
            if (fMaxVal < maxVal):
                fMaxVal = maxVal
                globalA = a
                globalB = b
                globalC = bestC

            b = b + stepB # zwiększenie wartości parametru B
            c = yCenter - 3*r/2 # przywrócenie wartości parametru C do wartości początkowej

        a = a + stepA #zwiększenie wartości parametru C
        b = xCenter - r/2 #przywrócenie wartości parametru B do wartości początkowej

    #rysujParabole(img,globalA,globalB,globalC)
    return globalA, globalB, globalC

#####   Funkcja licząca sumę wartości pikseli funkcji parabolicznej #####
#       przyjmuje argumenty:
#       img  - obraz wejsciowy
#       at,bt,ct - parametry paraboli górnej (górna powieka)
#       ab,bb,cb - parametry paraboli dolnej (dolna powieka)
def parabolicCurveSumPoints(img,a,b,c,x,y,r):
    cols, rows = img.shape[:2]

    value = 0
    for i in range(0,int(x-r/2)):
        indexNum = int((a*((i-b)**2)+c))
        if(indexNum>=cols or indexNum < 0):
            val = 0
        else:
            val = img[indexNum,i]
        value = value + val

    for i in range(int(x+r/2),cols):
        indexNum = int((a*((i-b)**2)+c))
        if(indexNum>=cols or indexNum < 0):
            val = 0
        else:
            val = img[indexNum,i]
        value = value + val

    return value


#####   Funkcja wyznaczająca punkty w danych granicach spełniające warunki do bycia granicą dolnej powieki #####
#       przyjmuje argumenty:
#       img  - obraz wejsciowy
#       xCenter, yCenter - wsp. środka
#       r - promień
def generateEdgelsBottom(img,yCenter,xCenter,r):
    rows, cols = img.shape[:2] #zgarnięcie wymiarów obrazu
    indexValues = []
    indexNumber = []

    for i in range(int(xCenter-r/2), int(xCenter+r/2)):
        oneLineVals = []
        for j in range(int(yCenter+(r*5/8)),int(rows)):
            oneLineVals.append(img[int(j),int(i)]) #y,x

        afterFilter = scipy.ndimage.filters.gaussian_filter1d(oneLineVals, 1)
        afterFilter = afterFilter*1.0
        diffResult = np.diff(afterFilter)

        if(len(diffResult) != 0):
            maxDiffValIndex = np.where(diffResult == diffResult.max())
            indexValues.append(int(yCenter+(r*5/8))+maxDiffValIndex[0][0]) #y
            indexNumber.append(i) #x

    return indexValues, indexNumber

#####   Funkcja wyznaczająca paramety paraboli opisującej dolną powiekę #####
#       przyjmuje argumenty:
#       img  - obraz wejsciowy
#       xCenter, yCenter - wsp. środka
#       r - promień
#       pntsParabola - wektory punktów
#       indNums - liczba wszystkich punktów
def parabolicCurveBottom(img,xCenter,yCenter,r, pntsParabola, indNums):
    fMaxVal = -10000
    globalA = 0
    globalB = 0
    globalC = 0
    stepA = -0.001
    stepB = 4
    stepC = 4
    a = stepA
    b = xCenter - r/2
    c = yCenter + r/2
    err = 0.5
    pointsSum = len(indNums)
    #1/(2*r)
    while (a > -1/(2*r)):
        #(xCenter+r/2)
        while (b < (xCenter+r/2)):
            #(yCenter + 2*r/3)
            while (c<(yCenter + 2*r)):
                #counting number of edgled pi i distance
                number = 0
                for i in range(0, pointsSum):

                    #distance = abs(pntsParabola[i]+(-a*((i+indNums[0])**2)+(b*(i+indNums[0]))+c))
                    distance = abs(pntsParabola[i]-(a*((i+indNums[0]-b)**2)+c))
                    #print(distance)
                    if(distance < 4):
                        number = number + 1

                if (float(number/pointsSum) > err):

                    tempVal = parabolicCurveSumPointsBottom(img,a,b,c)
                    if (fMaxVal < tempVal):
                        fMaxVal = tempVal
                        globalA = a
                        globalB = b
                        globalC = c
                c = c + stepC
            b = b + stepB
            c = yCenter + r/2
        a = a + stepA
        b = xCenter - r/2

    return globalA, globalB, globalC


#####   Funkcja rysująca parabole (powieki górna i dolna) na obrazie #####
#       przyjmuje argumenty:
#       img  - obraz wejsciowy
#       at,bt,ct - parametry paraboli górnej (górna powieka)
#       ab,bb,cb - parametry paraboli dolnej (dolna powieka)
def rysujParaboleMask(img,at,bt,ct,ab,bb,cb):
    rows, cols = img.shape[:2] #zdjecie wymiarów obrazu wejsciowego
    mask = np.full((rows, cols), 255, dtype=np.uint8)  #stworzenie maski

    xcord = [] # wektor na wsp. x
    ycordTop = [] # wektor na wsp. y górnej paraboli
    ycordBottom = [] # wektor na wsp. y dolnej paraboli

    # wpisanie wyznaczonych wartości funkcji parabolicznych i x do przygotowanych wektorów
    for i in range(0,cols):
        xcord.append(i)
        ycordTop.append(int((at*((i-bt)**2)+ct)))
        ycordBottom.append(int((ab*((i-bb)**2)+cb)))


    # stworzenie maski - ustawienie wartosci pikseli w górę od górnej paraboli i w dół od dolnej paraboli na 0.
    for x in range(0,cols):
        for y in range(0,ycordTop[x]):
            mask[y,x] = 0

        for y in range(ycordBottom[x],rows):
            mask[y,x] = 0

    return mask


#####   Funkcja licząca sumę wartości pikseli funkcji parabolicznej #####
#       przyjmuje argumenty:
#       img  - obraz wejsciowy
#       a,b,c - parametry paraboli
def parabolicCurveSumPointsBottom(img,a,b,c):
    cols, rows = img.shape[:2]
    value = 0
    for i in range(0,rows):
        valPixNum = int((a*((i-b)**2)+c))
        if(valPixNum >=280 ):
            val = 0
        else:
            val=img[valPixNum,i]

        value = value + val

    return value

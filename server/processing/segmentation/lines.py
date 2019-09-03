import cv2
import numpy as np
import scipy.ndimage

#####   Funkcja znajdująca i odcinająca powieki (linia prosta)  #####
#       przyjmuje argumenty:
#       img  - obraz wejsciowy
#       x,y - punkty środka teczowki
#       r - promień teczowki
#       circlePoints - liczba punktów zbierana z granicy
def eyelidDetection(img,x,y,r,circlePoints):
    rows, cols = img.shape[:2] #zbieranie wymiarow obazu wejsciowego
    sumOfPixels = 0 #stworzenie zmiennej przechowujacej sume zliczonych wartosci pikseli
    theta = (2 * np.pi) / circlePoints #wyznaczanie ziarna kata z ktorym wyznaczane beda kolejne wartosci
    angle = np.arange(theta, 2 * np.pi, theta) #wyznaczanie wektora wartosci katow do 2pi z ziarnem theta
    pointsValues = []

    #stworzenie maski filtra jednorodnego
    kernel = np.ones((5, 5), np.float32) / 17
    imgFiltr = cv2.filter2D(img, -1, kernel)

    #wyznaczanie punktow z zakladanej granicy teczowki
    xPoints = x - r * np.sin(angle)
    yPoints = y + r * np.cos(angle)
    for i in range(0, angle.size, 1):
        pointsValues.append(imgFiltr[int(np.round(xPoints[i])), int(np.round(yPoints[i]))]*1.0)

    #znajdowanie największego gradientu funkcji jasności obrazu na granicy tęczówki
    diffResult = np.diff(pointsValues)
    absDiffResult = abs(diffResult)
    i0, i1, i2, i3 = sortAndIndexCheck(absDiffResult)


    #stworzenie 4 punktów wyznaczonych jako miejsca przecięć granicy tęczówki z powiekami
    pkt0 = (int(yPoints[i0]),int(xPoints[i0]))
    pkt1 = (int(yPoints[i1]),int(xPoints[i1]))
    pkt2 = (int(yPoints[i2]),int(xPoints[i2]))
    pkt3 = (int(yPoints[i3]),int(xPoints[i3]))

    return pkt0, pkt1, pkt2, pkt3


## ??
#####   Funkcja sortująca  #####
#       przyjmuje argumenty:
#       imgEyeIris  - obraz wejsciowy tęczówki
#       imgEyePupil  - obraz wejsciowy źrenicy
#       scale - zastosowana skala
def sortAndIndexCheck(tab): #zwraca posortowaną tablicę
    indeksy = np.arange(len(tab))
    for i in range(len(tab)):
        j=len(tab)-1 #od ostatniej komórki
        while j>i:   #do aktualnie szukanej jako najmniejsza
            if tab[j]<tab[j-1]: #jeśli komórka wcześniej jest mniejsza, zamienia
                tmp=tab[j]
                temp_in = indeksy[j]

                tab[j]=tab[j-1]
                indeksy[j]=indeksy[j-1]

                tab[j-1]=tmp
                indeksy[j-1]=temp_in
            j-=1


    #maxVal0 = indeksy[len(tab)-1]
    #maxVal1 = indeksy[len(tab)-2]
    #maxVal2 = indeksy[len(tab)-3]
    #maxVal3 = indeksy[len(tab)-4]

    wybrane = []
    whichPoint = 1
    pointsNumber = 100
    dasd = 0
    percentBorder = 0.1
    while (len(wybrane) < 4):
        if (len(wybrane) == 0):
            wybrane.append(indeksy[len(tab)-1])
            whichPoint = 2
        elif (len(wybrane) == 1):
            if(indeksy[len(tab)-whichPoint] > wybrane[0]+percentBorder*pointsNumber or indeksy[len(tab)-whichPoint] < wybrane[0]-percentBorder*pointsNumber):
                wybrane.append(indeksy[len(tab)-whichPoint])
                whichPoint = whichPoint+1
            else:
                whichPoint = whichPoint+1
        elif (len(wybrane) == 2):
            if(indeksy[len(tab)-whichPoint]>wybrane[0]+percentBorder*pointsNumber or indeksy[len(tab)-whichPoint]<wybrane[0]-percentBorder*pointsNumber):
                if(indeksy[len(tab)-whichPoint]>wybrane[1]+percentBorder*pointsNumber or indeksy[len(tab)-whichPoint]<wybrane[1]-percentBorder*pointsNumber):
                    wybrane.append(indeksy[len(tab)-whichPoint])
                    whichPoint = whichPoint+1
                else:
                    whichPoint = whichPoint+1
            else:
                whichPoint = whichPoint+1
        elif (len(wybrane) == 3):
            if(indeksy[len(tab)-whichPoint]>wybrane[0]+percentBorder*pointsNumber or indeksy[len(tab)-whichPoint]<wybrane[0]-percentBorder*pointsNumber):
                if(indeksy[len(tab)-whichPoint]>wybrane[1]+percentBorder*pointsNumber or indeksy[len(tab)-whichPoint]<wybrane[1]-percentBorder*pointsNumber):
                    if(indeksy[len(tab)-whichPoint]>wybrane[2]+percentBorder*pointsNumber or indeksy[len(tab)-whichPoint]<wybrane[2]-percentBorder*pointsNumber):
                        wybrane.append(indeksy[len(tab)-whichPoint])
                        whichPoint = whichPoint+1
                    else:
                        whichPoint = whichPoint+1
                else:
                    whichPoint = whichPoint+1
            else:
                whichPoint = whichPoint+1


    #print("indeksy od najwiekszej zmiany: " + str(maxVal0)+" " + str(maxVal1)+" " + str(maxVal2)+ " "+ str(maxVal3))
    wybrane.sort(reverse = False)
    maxVal0 = wybrane[0]
    maxVal1 = wybrane[1]
    maxVal2 = wybrane[2]
    maxVal3 = wybrane[3]
    return maxVal0, maxVal1, maxVal2, maxVal3


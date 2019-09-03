# -*- coding: utf-8 -*-

"""
morphsnakes

"""

from itertools import cycle
import cv2
import numpy as np
from scipy import ndimage
from scipy.ndimage import binary_dilation, binary_erosion, \
                        gaussian_filter, gaussian_gradient_magnitude

class fcycle(object):
    
    def __init__(self, iterable):
        """Call functions from the iterable each time it is called."""
        self.funcs = cycle(iterable)
    
    def __call__(self, *args, **kwargs):
        f = next(self.funcs)
        return f(*args, **kwargs)
    

# erosion and dilation operators for 2D 
P= [np.eye(3), np.array([[0,1,0]]*3), np.flipud(np.eye(3)), np.rot90([[0,1,0]]*3)]
_aux = np.zeros((0))
def erosion(u):
    """erosion operator."""
    global _aux
    if u.shape != _aux.shape[1:]:
        _aux = np.zeros((len(P),) + u.shape)
    
    for i in range(len(P)):
        _aux[i] = binary_erosion(u, P[i])
    
    return _aux.max(0)

def dilation(u):
    """dilation operator."""
    global _aux
    if u.shape != _aux.shape[1:]:
        _aux = np.zeros((len(P),) + u.shape)
    
    for i in range(len(P)):
        _aux[i] = binary_dilation(u, P[i])
    
    return _aux.min(0)

# closing operator.
closing = lambda u: erosion(dilation(u))
opening = lambda u: dilation(erosion(u))
curvop = fcycle([closing, opening])

# Stopping factors (function g(I) in the paper).
def gborders(img, alpha=1.0, sigma=1.0):
    """Stopping criterion for image borders."""
    # The norm of the gradient.
    gradnorm = gaussian_gradient_magnitude(img, sigma, mode='constant')
    return 1.0/np.sqrt(1.0 + alpha*gradnorm)

def glines(img, sigma=1.0):
    """Stopping criterion for image black lines."""
    return gaussian_filter(img, sigma)
   
class MorphGAC(object):
    """Morphological GAC based on the Geodesic Active Contours."""
    
    def __init__(self, data, smoothing=1, threshold=0, balloon=0):
        #Create a Morphological GAC solver.
        
        self._u = None
        self._v = balloon
        self._theta = threshold
        self.smoothing = smoothing
        
        self.set_data(data)
    
    def set_levelset(self, u):
        self._u = np.double(u)
        self._u[u>0] = 1
        self._u[u<=0] = 0
    
    def set_balloon(self, v):
        self._v = v
        self._update_mask()
    
    def set_threshold(self, theta):
        self._theta = theta
        self._update_mask()
    
    def set_data(self, data):
        self._data = data
        self._ddata = np.gradient(data)
        self._update_mask()
        # The structure element for binary dilation and erosion.
        self.structure = np.ones((3,)*np.ndim(data))
    
    def _update_mask(self):
        """Pre-compute masks for speed."""
        self._threshold_mask = self._data > self._theta
        self._threshold_mask_v = self._data > self._theta/np.abs(self._v)
    
    levelset = property(lambda self: self._u,
                        set_levelset)
    data = property(lambda self: self._data,
                        set_data)
    balloon = property(lambda self: self._v,
                        set_balloon)
    threshold = property(lambda self: self._theta,
                        set_threshold)
    
    def step(self):
        """Perform a single step of the morphological snake evolution."""
        # Assign attributes to local variables for convenience.
        u = self._u
        gI = self._data
        dgI = self._ddata
        theta = self._theta
        v = self._v
        
        res = np.copy(u)
        
        # Balloon.
        if v > 0:
            aux = binary_dilation(u, self.structure)
        elif v < 0:
            aux = binary_erosion(u, self.structure)
        if v!= 0:
            res[self._threshold_mask_v] = aux[self._threshold_mask_v]
        
        # Image attachment.
        aux = np.zeros_like(res)
        dres = np.gradient(res)
        for el1, el2 in zip(dgI, dres):
            aux += el1*el2
        res[aux > 0] = 1
        res[aux < 0] = 0
        
        # Smoothing.
        for i in range(self.smoothing):
            res = curvop(res)
        
        self._u = res
    
    def run(self, iterations):
        """Run several iterations of the morphological snakes method."""
        for i in range(iterations):
            self.step()
    

def evolve_visual(msnake, levelset=None, num_iters=20, background=None):

    #Visual evolution of a morphological snake.
    
    if levelset is not None:
        msnake.levelset = levelset
    # Iterate.
    for i in range(num_iters):
        # Evolve.
        msnake.step()
    
    # Return the last levelset.
    return msnake.levelset

############## Znajdowanie srodka zrenicy jako srednia ciemnych pikseli
def findPupilBoundary_AverageDarkPix(img):
    img = cv2.dilate(img,(7,7))
    img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
    img_profilling = img.copy()
    # podzielenie obrazu na 9 czesci wydzielonych przez 4 linie - prawo, lewo, gora, dol
    # w obszarze srodkowym bedzie wyszukiwana teczowka
    rows,cols,dim = img.shape
    rows_div =rows/5#rows/3
    cols_div = cols/5#cols/3
    #wybrano duzy obszar - 60% obrazu bo CASIA ma rozne obrazy teczowki
    left = int(1*cols_div)
    right = int(4*cols_div) #2*cols_div
    up = int(1*rows_div)
    down = int(4*rows_div) #2*rows_div

    profiling_line = 1

    #wektor - ile linii profilowych w kazdym z kierunkow 
    hor_l = [0]*int(((down-up)/profiling_line + 1))
    ver_l = [0]*int(((right-left)/profiling_line + 1))
    temp_l = []
    hor_list = []
    ver_list = []
    min_val = 100

    #szukanie wartosci minimalnej piksela w obszarze wyznaczonym przez granice lewo prawo gora dol
    i = left
    j = up
    while i <= right:
        j = up
        while j <= down:
            if int(img[j][i][0]) < min_val:
                min_val = int(img[j][i][0])
            j += 1
        i += 1


    # linie poziome - profilowanie
    min_val_plus = 25
    m = 0 #iterator po poziomie od lewej do prawej
    n = up #iterator po liniach od gory do dolu
    k = 0 #iterator do sprawdzania dlugosci kazdej linii hor_l[k] = dlugosc linii nr k
    max_line = 0 #maksymalna linia
    while n <= down:
        m = left
        while m <= right:
            temp = int(img[n][m][0]) #wartosc funkcji obrazowej w danym piskelu
            if temp < (min_val + min_val_plus): #jesli piksel ciemny
                hor_l[k] += 1 
                img_profilling[n][m] = (0,255,0) #img_profilling na zielono
                temp_l.append([m,n]) 
            else:
                img_profilling[n][m] = (255,255,255) #jesli piksel jasny, na bialo
            m += 1 #o jeden piksel w prawo
        if hor_l[k] > max_line: #jesli dlugosc linii obecnie przetwarzanej wieksza od maksymalnej
            max_line = hor_l[k] #przypisanie
            hor_list = temp_l
        temp_l = []
        n += profiling_line
        k += 1
    
    #najdluzsza linie pozioma koloruj na czerwono
    for i in range(len(hor_list)):
        img_profilling[int(hor_list[i][1])][int(hor_list[i][0])] = (0,0,255)

    max_t = max_line

    # linie pionowe - profilowanie
    m = 0 # iterator po pionie - od gory do dolu
    n = left #iterator po kazdej linii 
    k = 0 #iterator do sprawdzania dlugosci kazdej linii hor_l[k] = dlugosc linii nr k
    max_line = 0
    temp_l = []
    while n <= right:
        m = up
        while m <= down:
            temp = int(img[m][n][0])
            if temp < (min_val + min_val_plus): #jesli piksel ciemny
                ver_l[k] += 1 
                img_profilling[m][n] = (0,255,0) #koloruj na zielony
                temp_l.append([n,m])
            else:
                img_profilling[m][n] = (255,255,255) #jelsi piksel jasny, na bialo
            m += 1
        if ver_l[k] > max_line: #jesli dlugosc linii obecnie przetwarzanej wieksza od maksymalnej
            max_line = ver_l[k]
            ver_list = temp_l
        temp_l = []
        n += profiling_line
        k += 1

    # najdluzsza linia pionowa na niebieski   
    for i in range(len(ver_list)):
        img_profilling[int(ver_list[i][1])][int(ver_list[i][0])] = (255,0,0)
 
    # max_t - najdluzsza linia w zrenicy
    if max_line > max_t:
        max_t = max_line

    # szukanie srodka zrenicy
    cx = 0 #wspolrzedne
    cy = 0
    hlst = []
    vlst = []
    sumh = 0
    sumv = 0

    # w obszarze srodkowym srodek zrenicy jako srednia z polozenia ciemnych pikseli
    i = left

    while i <= right:
        j = up
        while j <= down:
            if int(img[j][i][0]) < (min_val + min_val_plus):
                hlst.append(i)
                sumh += i
                vlst.append(j)
                sumv += j
            j += 1
        i += 1

    cx = int(sumh/len(hlst))
    cy = int(sumv/len(vlst))  
    center = (int(cx), int(cy))
    radius = int(max_t/2)
    return cx,cy,max_t

# ustawia levelset na podstawie parametrow poczatkowych
# ksztalt obrazu, srodek zrenicy, promien, skala
def circle_levelset(shape, center, sqradius, scalerow=1.0):
    """Build a binary function with a circle as the 0.5-levelset."""
    touple = map(slice, shape)
    grid = np.mgrid[list(touple)].T - center
    phi = sqradius - np.sqrt(np.sum((grid.T)**2, 0))
    u = np.float_(phi > 0)
    return u

#sprawdzam zrenice
def test_pupil(img_gray,cx,cy,max_t):
    pupil_bw = np.zeros(img_gray.shape,np.uint8)
    # Load the image.
    rows,cols = img_gray.shape
    img_lvl = img_gray.copy()/255.0
    # g(I)
    gI = gborders(img_lvl, alpha=2200, sigma=3)
    
    # Morphological GAC. Initialization of the level-set.
    mgac = MorphGAC(gI, smoothing=1, threshold=0.31, balloon=1)
    #promien zrenicy jako 0.3 maksymalnej dlugosci w srodku zrenicy 
    mgac.levelset = circle_levelset(img_lvl.shape, (cy, cx), (max_t*0.3))
    
    # Visual evolution.
    ij = evolve_visual(mgac, num_iters=50, background=img_lvl)
    
    x_list = []
    y_list = []
    #do maski, kolorowanie konturu zrenicy 
    for i in range(cols-1):
        for j in range(rows-1):
            if ij[j][i] == 0:
                pupil_bw[j][i] = 255
            else:
                x_list.append(i)
                y_list.append(j)
                pupil_bw[j][i] = 0
    pupil_down = max(y_list)
    pupil_up = min(y_list)
    pupil_right = max(x_list)
    pupil_left = min(x_list)
    return pupil_bw,pupil_down,pupil_up,pupil_left,pupil_right

#sprawdzam teczowke
def test_iris(img_gray,cx,cy,max_t):
    iris_bw = np.zeros(img_gray.shape,np.uint8)
    # Load the image.
    rows,cols= img_gray.shape
    img_lvl = img_gray.copy()/255.0

    # gradient obrazu 
    gI = gborders(img_lvl, alpha=2200, sigma=3)
    
    # Inicjalizacja morphGAC
    mgac = MorphGAC(gI, smoothing=1, threshold=0.31, balloon=1)
    # promien do teczowki jako najdluzsza linia w srodku zrenicy/2 + 30px
    mgac.levelset = circle_levelset(img_lvl.shape, (cy, cx), (int(max_t/2) + 30))
    
    # Visual evolution. Do wywalenia potem
    ij = evolve_visual(mgac, num_iters=100, background=img_lvl)
    
    x_list = []
    y_list = []
    
    #do grabcut, kolorowanie konturu teczowki
    for i in range(cols-1):
        for j in range(rows-1):
            if ij[j][i] == 0:
                iris_bw[j][i] = 255
            else:
                x_list.append(i)
                y_list.append(j)
                iris_bw[j][i] = 0
    
    iris_down = max(y_list)
    iris_up = min(y_list)
    iris_right = max(x_list)
    iris_left = min(x_list)
    return iris_bw, iris_down, iris_up, iris_right,iris_left


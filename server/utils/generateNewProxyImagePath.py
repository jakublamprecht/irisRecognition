import sys
from os import path, makedirs
from uuid import uuid4

def generateNewProxyImagePath(filePath):
    dump, extension = path.splitext(filePath)

    if getattr(sys, 'frozen', False):
        currentDir = sys._MEIPASS or sys.executable
    else:
        currentDir = path.dirname(path.abspath(__file__))

    id = str(uuid4())
    idDirectory = path.abspath(path.join(currentDir, '..', 'temp', id))

    makedirs(idDirectory)
    fileName = '{}{}'.format('origin', extension)
    newFilePath = path.join(idDirectory, fileName)

    return newFilePath

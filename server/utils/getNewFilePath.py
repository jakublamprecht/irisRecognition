from os import path
import re

def getNewFilePath(baseFilePath, newFileName):
    numberRegex = r"(-[0-9]+)$"

    fileNumber = 0
    filePath, fileExt = path.splitext(baseFilePath)
    fileName = path.basename(filePath)
    filePath = filePath.replace(fileName, newFileName)

    newFilePath = '{}-{}{}'.format(filePath, fileNumber, fileExt)

    while path.exists(newFilePath):
        fileNumber += 1
        newFilePath = '{}-{}{}'.format(filePath, fileNumber, fileExt)

    return newFilePath

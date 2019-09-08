from flask_restful import Resource, reqparse
from processing.segmentation.segmentacja_teczowki import segmentation
from utils.getNewFilePath import getNewFilePath
import cv2

class Segmentation(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('filePath', type=str)
        parser.add_argument('segmentationMethod', type=str)
        parser.add_argument('noiseMethod', type=str)
        args = parser.parse_args()

        srcPath = args['filePath']
        segmentationMethod = args['segmentationMethod']
        noiseMethod = args['noiseMethod']

        srcImage = cv2.imread(srcPath, cv2.CV_8UC1)
        segmentationResults, mask, maskPreview = segmentation(srcImage, segmentationMethod, noiseMethod)

        maskFilePath = getNewFilePath(srcPath, 'segmentation-mask')
        maskedImagePath = getNewFilePath(srcPath, 'segmentation-mask-prev')

        cv2.imwrite(maskFilePath, mask)
        cv2.imwrite(maskedImagePath, maskPreview)

        return {
            'workingImage': srcPath,
            'mask': maskFilePath,
            'imageMasked': maskedImagePath,
            **segmentationResults,
        }

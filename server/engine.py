import sys
import numpy as np
import base64
import cv2

from flask import Flask, jsonify, make_response
from flask_restful import Api
from resources.init import addResrouces

app = Flask(__name__)
api = Api(app)

addResrouces(api)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=False)

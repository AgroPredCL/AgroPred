from motor.motor_asyncio import AsyncIOMotorClient
import os
import base64
from pymongo import MongoClient
import gridfs

from io import BytesIO
import numpy as np
import matplotlib.pyplot as plt

from PIL import Image

# Conexion


MONGO_DETAILS = os.getenv("MONGO_DETAILS", "mongodb+srv://admin:admin@model-related.5l2ez.mongodb.net/?retryWrites=true&w=majority&appName=model-related")

client = AsyncIOMotorClient(MONGO_DETAILS)
database = client.myFirstDatabase  
collection = database.images  

img = r'C:\Users\joaco\OneDrive\Desktop\image.jpg'
fid = ""

# Lectura
with open(img, "rb") as image_file:
	encoded_string = base64.b64encode(image_file.read())

# Carga de la imagen
filename = "test"
fs = gridfs.GridFS(database)
fileid = fs.put(encoded_string, filename=filename)
database.image.insert_one({"filename":filename,"fileid":fileid})



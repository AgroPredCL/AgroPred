from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_DETAILS = os.getenv("MONGO_DETAILS", "mongodb+srv://admin:admin@model-related.5l2ez.mongodb.net/?retryWrites=true&w=majority&appName=model-related")

client = AsyncIOMotorClient(MONGO_DETAILS)
db = client.myFirstDatabase  
collection = db.images  
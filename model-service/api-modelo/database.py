from motor.motor_asyncio import AsyncIOMotorClient
import os

# Configurar los detalles de la conexión a MongoDB
MONGO_DETAILS = os.getenv("MONGO_DETAILS", "mongodb+srv://admin:admin@model-related.5l2ez.mongodb.net/?retryWrites=true&w=majority&appName=model-related")

# Crear el cliente de MongoDB y conectar a la base de datos y colección
client = AsyncIOMotorClient(MONGO_DETAILS)
db = client.modelDatabase  # Nombre de la base de datos
collection = db.imagesFruits  # Nombre de la colección

# Función para subir una imagen a MongoDB
async def upload_image(file_path: str):
    # Leer el archivo de imagen desde el sistema de archivos
    try:
        with open(file_path, "rb") as file:
            image_data = file.read()
    except Exception as e:
        raise Exception(f"Error reading file: {str(e)}")

    # Crear un documento para almacenar la imagen
    image_document = {
        "filename": os.path.basename(file_path),
        "content_type": "image/jpeg",  # Cambia esto según el tipo de imagen
        "image_data": image_data
    }

    # Insertar el documento en MongoDB
    try:
        result = await collection.insert_one(image_document)
    except Exception as e:
        raise Exception(f"Error saving image to database: {str(e)}")

    return {"message": "Image uploaded successfully", "image_id": str(result.inserted_id)}

async def main():
    result = await upload_image("../images/Avocado 0001.jpg")
    print(result)
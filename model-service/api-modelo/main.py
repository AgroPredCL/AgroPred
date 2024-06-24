from fastapi import FastAPI, Query
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from tensorflow.keras.applications.inception_v3 import preprocess_input

def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(128, 128))
    img_array = image.img_to_array(img)
    img_array_expanded_dims = np.expand_dims(img_array, axis=0)
    return preprocess_input(img_array_expanded_dims)

model = load_model('./Avocado_classification_Inception_v1.h5')

app = FastAPI()

@app.get("/")
async def root():
    return {"how to test?": "http://localhost:8000/disease/fruit/{number of image (xxxx)}"}

@app.get("/disease/fruit/")
async def process_image(image_number: str = Query(..., description="Image number")):
    processed_image = preprocess_image(f'./images/Avocado {image_number}.jpg')
    prediction = model.predict(processed_image)

    states = ["scab", "healthy", "anthracnose"]
    max_index = np.argmax(prediction)
    state = states[max_index]

    # Give description of the state
    description = {
        "scab": "Scab is a disease that affects the leaves and fruit of the avocado tree. It is caused by the fungus Elsinoe spp. and is characterized by dark, raised spots on the fruit and leaves.",
        "healthy": "The avocado is healthy and free from any disease.",
        "anthracnose": "Anthracnose is a fungal disease that affects the leaves, fruit, and stems of the avocado tree. It is caused by the fungus Colletotrichum spp. and is characterized by dark, sunken lesions on the fruit and leaves."
    }

    # Give impact of the state
    impacto = {
        "scab": "Scab can reduce the quality and yield of the avocado fruit. It can also weaken the tree and make it more susceptible to other diseases.",
        "healthy": "The avocado is healthy and will produce a good crop of fruit.",
        "anthracnose": "Anthracnose can reduce the quality and yield of the avocado fruit. It can also weaken the tree and make it more susceptible to other diseases."
    }

    return {"from": "fruit",
            "state": state,
            "description": description[state],
            "impact": impacto[state]}
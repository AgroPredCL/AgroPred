import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import torch
from torch.utils.data import Dataset, DataLoader
import torch.nn as nn

device = 'cuda:0' if torch.cuda.is_available() else 'cpu'

# Función para crear secuencias
def create_sequence(data, sequence_length):
    X, y = [], []
    for i in range(len(data) - sequence_length):
        sequence = data[i:i + sequence_length]
        target = data[i + sequence_length]
        X.append(sequence)
        y.append(target)
    X = np.array(X).reshape(-1, sequence_length, 1)
    y = np.array(y).reshape(-1, 1)
    return X, y

# Dataset personalizado
class TimeSeriesDataset(Dataset):
    def __init__(self, X, y, device):
        self.X = torch.tensor(X, dtype=torch.float32).to(device)
        self.y = torch.tensor(y, dtype=torch.float32).to(device)

    def __len__(self):
        return len(self.X)

    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]

# Modelo LSTM
class LSTMModel(nn.Module):
    def __init__(self, input_size, hidden_size, output_size, num_layers, drop, bi):
        super(LSTMModel, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.bidirectional = bi
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, bidirectional=bi, batch_first=True, dropout=drop)
        self.fc = nn.Linear(hidden_size * 2 if bi else hidden_size, output_size)

    def forward(self, x):
        num_directions = 2 if self.bidirectional else 1
        h0 = torch.zeros(self.num_layers * num_directions, x.size(0), self.hidden_size).to(device)
        c0 = torch.zeros(self.num_layers * num_directions, x.size(0), self.hidden_size).to(device)
        out, _ = self.lstm(x, (h0, c0))
        out = self.fc(out[:, -1, :])
        return out

# Función de inferencia (predicción)
def inferencia(model, data_loader, device):
    model.eval()
    predictions = []
    with torch.no_grad():
        for inputs, _ in data_loader:
            inputs = inputs.to(device)
            outputs = model(inputs)
            predictions.extend(outputs.cpu().numpy())
    return predictions

def predictN(nombreCuartel):
    # Cargar datos
    file_path_N = f'../modelos/{nombreCuartel}.csv'
    data_N = pd.read_csv(file_path_N)
    """
    halfway_point = len(data_N) // 2

    # Mantener solo la primera mitad
    data_N = data_N.iloc[:halfway_point]
    """

    window_size = 20
    
    data_N = data_N[['fecha hora', 'Nitrogeno']]
    
    data_N.drop('fecha hora', axis=1, inplace=True)
    data_N2 = data_N.rolling(window=window_size).mean()

    data_N = pd.concat([data_N[:21], data_N2[21:]], ignore_index=True)

    nitrogeno = data_N['Nitrogeno'].to_numpy()

    X_nitrogeno, y_nitrogeno = create_sequence(nitrogeno, sequence_length=144)

    # División de los datos en entrenamiento, validación y prueba
    val_split = int(len(X_nitrogeno) * 0.90)

    X_test_N, y_test_N = X_nitrogeno[val_split:], y_nitrogeno[val_split:]

    test_dataset_N = TimeSeriesDataset(X_test_N, y_test_N, device)

    batch_size = 128
    test_dataloader_N = DataLoader(test_dataset_N, batch_size=batch_size, shuffle=False)

    # Configuración del modelo
    input_size = 1
    hidden_size = 512
    output_size = 1
    num_layers = 2
    drop = 0.2
    bi = False

    # Cargar el modelo preentrenado
    model_N = LSTMModel(input_size, hidden_size, output_size, num_layers, drop, bi).to(device)
    model_N.load_state_dict(torch.load('../modelos/modelo_N.pth', map_location=torch.device('cpu')))
    model_N.eval()


    # Realizar predicciones en el conjunto de prueba
    predictions = inferencia(model_N, test_dataloader_N, device)

    # Convertir las predicciones en un array numpy
    predictions = np.array(predictions).flatten()

    return predictions
import datetime
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import torch
from torch.utils.data import Dataset, DataLoader
import torch.nn as nn

device = 'cuda:0' if torch.cuda.is_available() else 'cpu'

def create_sequence(data, sequence_length):
    """
    Convierte una serie temporal unidimensional en una lista de secuencias para entrenar un LSTM.

    Parametros:
    - data (np.array): Serie temporal unidimensional de tamaño (n_samples,).
    - sequence_length (int): Número de pasos de tiempo en cada secuencia.

    Returns:
    - X (numpy array): Secuencias de entrada de tamaño (n_samples, sequence_length, 1).
    - y (numpy array): Valores de salida correspondientes a cada secuencia, de tamaño (n_samples, 1).
    """
    X, y = [], []
    for i in range(len(data) - sequence_length):
        # Extrae una secuencia de longitud `sequence_length` de la serie temporal
        sequence = data[i:i + sequence_length]
        # El valor objetivo es el siguiente valor después de la secuencia
        target = data[i + sequence_length]

        X.append(sequence)
        y.append(target)

    # Convertir a arrays numpy y agregar dimensión para LSTM
    X = np.array(X).reshape(-1, sequence_length, 1)
    y = np.array(y).reshape(-1, 1)

    return X, y

class TimeSeriesDataset(Dataset):
  def __init__(self, X, y):
      self.X = torch.tensor(X, dtype=torch.float32).to(device)
      self.y = torch.tensor(y, dtype=torch.float32).to(device)

  def __len__(self):
      return len(self.X)

  def __getitem__(self, idx):
      return self.X[idx], self.y[idx]

class LSTMModel(nn.Module):
  def __init__(self, input_size, hidden_size, output_size, num_layers, drop, bi):
      super(LSTMModel, self).__init__()
      self.hidden_size = hidden_size
      self.num_layers = num_layers
      self.bidirectional = bi  # Guardar la bidireccionalidad
      self.lstm = nn.LSTM(input_size, hidden_size, num_layers, bidirectional=bi, batch_first=True, dropout=drop)
      self.fc = nn.Linear(hidden_size * 2 if bi else hidden_size, output_size)
      self.dropout = nn.Dropout(drop)

  def forward(self, x):
      # Considerar el número de direcciones para h0 y c0
      num_directions = 2 if self.bidirectional else 1

      h0 = torch.zeros(self.num_layers * num_directions, x.size(0), self.hidden_size).to(device)  # Estado oculto inicial
      c0 = torch.zeros(self.num_layers * num_directions, x.size(0), self.hidden_size).to(device)  # Estado de celda inicial

      out, _ = self.lstm(x, (h0, c0))  # Forward LSTM
      if self.num_layers == 1:
        out = self.dropout(out[:, -1,:])
      else:
        out = out[:, -1,:]
      
      out = self.fc(out) # Obtener la última salida para la predicción

      return out

'''
class LSTMModel(nn.Module):
  def __init__(self, input_size, hidden_size, output_size, num_layers, drop, bi):
      super(LSTMModel, self).__init__()
      self.hidden_size = hidden_size
      self.num_layers = num_layers
      self.lstm = nn.LSTM(input_size, hidden_size, num_layers, bidirectional=bi, batch_first=True, dropout=drop)
      self.fc = nn.Linear(hidden_size * 2 if bi else hidden_size, output_size)

  def forward(self, x):
      h0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(device)  # Estado oculto inicial
      c0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(device)  # Estado de celda inicial

      out, _ = self.lstm(x, (h0, c0))  # Forward LSTM
      out = self.fc(out[:, -1, :])  # Obtener la última salida para la predicción

      return out
'''
class RMSELoss(nn.Module):
    def __init__(self):
        super(RMSELoss, self).__init__()
        self.mse = nn.MSELoss()

    def forward(self, y_pred, y_true):
        return torch.sqrt(self.mse(y_pred, y_true))


# Definir la función de entrenamiento
def train(model, train_dataloader, criterion, optimizer, device):
    model.to(device)
    model.train()  # Poner el modelo en modo de entrenamiento
    total_loss = 0

    for inputs, targets in train_dataloader:
        inputs, targets = inputs.to(device), targets.to(device)

        # Forward
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, targets)

        # Backward
        loss.backward()
        optimizer.step()

        total_loss += loss.item()

    avg_loss = total_loss / len(train_dataloader)
    return avg_loss

# Definir la función de evaluación
def evaluate(model, val_dataloader, criterion, device):
    model.to(device)
    model.eval()  # Poner el modelo en modo de evaluación
    total_loss = 0
    total_mae, total_mape, total_r2 = 0, 0, 0

    with torch.no_grad():  # Desactivar el cálculo de gradientes
        for inputs, targets in val_dataloader:
            inputs, targets = inputs.to(device), targets.to(device)

            # Forward
            outputs = model(inputs)
            loss = criterion(outputs, targets)
            total_loss += loss.item()

            # Cálculo de métricas
            mae = torch.nn.functional.l1_loss(outputs, targets, reduction='mean')
            mape = torch.mean(torch.abs((targets - outputs) / targets)) * 100
            ss_res = torch.sum((targets - outputs) ** 2)
            ss_tot = torch.sum((targets - torch.mean(targets)) ** 2)
            r2 = 1 - ss_res / ss_tot

            total_mae += mae.item()
            total_mape += mape.item()
            total_r2 += r2.item()

    # Promedio de las métricas
    avg_loss = total_loss / len(val_dataloader)
    avg_mae = total_mae / len(val_dataloader)
    avg_mape = total_mape / len(val_dataloader)
    avg_r2 = total_r2 / len(val_dataloader)

    return avg_loss, avg_mae, avg_mape, avg_r2

def plot_loss(train_loss, val_loss):
    """
    Grafica las curvas de pérdida para entrenamiento y validación.

    Parámetros:
    - train_loss: Lista con los valores de pérdida en cada época para el conjunto de entrenamiento.
    - val_loss: Lista con los valores de pérdida en cada época para el conjunto de validación.
    """
    epochs = range(1, len(train_loss) + 1)

    plt.figure(figsize=(10, 6))
    plt.plot(epochs, train_loss, label='Train Loss', color='blue', linestyle='-')
    plt.plot(epochs, val_loss, label='Validation Loss', color='orange', linestyle='--')
    plt.xlabel('Epochs')
    plt.ylabel('Loss')
    plt.title('Training and Validation Loss')
    plt.legend()
    plt.grid(True)
    plt.show()

def plot_r2_mae_mape(r2, mae, mape):
    #quiero un grafico aparte para cada una
    plt.figure(figsize=(10, 6))
    plt.plot(r2, label='R2 Score', color='blue', linestyle='-')
    plt.xlabel('Epochs')
    plt.ylabel('R2 Score')
    plt.title('R2 Score')
    plt.legend()
    plt.grid(True)
    plt.show()

    plt.figure(figsize=(10, 6))
    plt.plot(mae, label='MAE', color='orange', linestyle='--')
    plt.xlabel('Epochs')
    plt.ylabel('MAE')
    plt.title('MAE')
    plt.legend()
    plt.grid(True)
    plt.show()

    plt.figure(figsize=(10, 6))
    plt.plot(mape, label='MAPE', color='green', linestyle='-.')
    plt.xlabel('Epochs')
    plt.ylabel('MAPE')
    plt.title('MAPE')
    plt.legend()
    plt.grid(True)
    plt.show()

def plot_variable(data, variable):

    plt.figure(figsize=(14, 7))
    plt.plot(data)
    plt.title( variable + ' durante mes de Noviembre 2023')
    plt.xlabel('Tiempo')
    plt.ylabel(variable)
    plt.grid(True)
    plt.show()

def plot_sequence(sequences, title):
    plt.figure(figsize=(12, 6))
    for i, sequence in enumerate(sequences):
        plt.plot(sequence, label=f'Secuencia {i+1}')
    plt.title(title)
    plt.legend()
    plt.show()

def inferencia(model, data_loader, device):
    model.eval()
    predictions = []
    with torch.no_grad():
        for inputs in data_loader:
            inputs = inputs[0].to(device)
            outputs = model(inputs)
            predictions.extend(outputs.cpu().numpy())
    return predictions

def plot_predictions(real, pred, titulo):
    plt.figure(figsize=(10, 6))
    plt.plot(real, label= titulo + ' real (2022)')
    plt.plot(pred, label='Predicciones del Modelo', linestyle='--')
    plt.xlabel('Tiempo')
    plt.ylabel(titulo)
    plt.title('Comparación entre ' + titulo + ' Real y Predicha (2022)')
    plt.legend()
    plt.show()




def predictHumedad(nombreCuartel):
    # Cargar datos
    file_path_P = f'../modelos/humedad.csv'
    data_P = pd.read_csv(file_path_P)
    """
    halfway_point = len(data_N) // 2

    # Mantener solo la primera mitad
    data_N = data_N.iloc[:halfway_point]
    """

    ph = data_P['humedad'].to_numpy()

    X_ph, y_ph = create_sequence(ph, sequence_length=144)

    # División de los datos en entrenamiento, validación y prueba
    val_split = int(len(X_ph) * 0.90)

    X_test_P, y_test_P = X_ph[val_split:], y_ph[val_split:]

    test_dataset_P = TimeSeriesDataset(X_test_P, y_test_P)

    batch_size = 128
    test_dataloader_P = DataLoader(test_dataset_P, batch_size=batch_size, shuffle=False)

    # Configuración del modelo
    input_size = 1
    hidden_size = 512
    output_size = 1
    num_layers = 2
    drop = 0.2
    epochs = 80
    learning_rate = 0.001
    weight_decay = 0.001
    bi = False

    # Cargar el modelo preentrenado
    model_N = LSTMModel(input_size, hidden_size, output_size, num_layers, drop, bi).to(device)
    model_N.load_state_dict(torch.load('../modelos/modelo_humedad.pth', map_location=torch.device('cpu')))
    model_N.eval()


    # Realizar predicciones en el conjunto de prueba
    predictions = inferencia(model_N, test_dataloader_P, device)

    # Convertir las predicciones en un array numpy
    predictions = np.array(predictions).flatten()
    predictions = predictions.astype(float).tolist()

    # Fecha de inicio
    fechaActual = datetime.datetime.now() 
    start_date = datetime.datetime.strptime(fechaActual.strftime('%d-%m-%Y %H:%M:%S'), '%d-%m-%Y %H:%M:%S')


    # Verifica si hay suficientes elementos en predictions para asignar a las mediciones
    num_pred = len(predictions)
    num_mediciones = num_pred  # Usamos la cantidad de predicciones

    # Generar el array de mediciones cada 30 minutos con los valores de las predicciones
    output = []
    # Iterar solo cada 3 mediciones (tomando solo las mediciones correspondientes a 30 minutos)
    for i in range(0, num_mediciones, 3):
        medicion = {}
        medicion['fecha'] = start_date.strftime('%d-%m-%Y')  # Solo la fecha
        medicion['hora'] = start_date.strftime('%H:%M:%S')  # Solo la hora
        medicion['valor'] = predictions[i]  # Asignamos el valor de la predicción
        output.append(medicion)

        # Sumar 30 minutos a la fecha de la medición
        start_date += datetime.timedelta(minutes=30)

    # Retornar las mediciones como un JSON
    return output
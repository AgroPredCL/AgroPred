// api.js
// src/services/apiService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Reemplaza con la URL de tu API
});

export const fetchData = async (ruta) => {
  try {
    console.log("Mmmmmm raro")
    const response = await api.get(ruta); // Reemplaza '/ruta' con la ruta específica de tu API
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
}; 

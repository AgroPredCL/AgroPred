import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API para el puerto 8000
export const apiEstado = createApi({
  reducerPath: 'apiEstado',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL_8000 }),
  endpoints: (builder) => ({
    getFechasLimite: builder.query({
      query: (cuartel) => `/fechasLimite?nombreCuartel=${cuartel}`
    }),
    getStateNitrogeno: builder.query({
      query: (cuartel) => `/state/nitrogeno?nombreCuartel=${cuartel}`
    }),
    getStatePotasio: builder.query({
      query: (cuartel) => `/state/potasio?nombreCuartel=${cuartel}`
    }),
    getStateFosforo: builder.query({
      query: (cuartel) => `/state/fosforo?nombreCuartel=${cuartel}`
    }),
    getStatePH: builder.query({
      query: (cuartel) => `/state/ph?nombreCuartel=${cuartel}`
    }),
    getStateHumedad: builder.query({
      query: (cuartel) => `/state/humedad?nombreCuartel=${cuartel}`
    }),
    getStateTemperatura: builder.query({
      query: (cuartel) => `/state/temperatura?nombreCuartel=${cuartel}`
    }),
    getStateConductividad: builder.query({
      query: (cuartel) => `/state/conductividad?nombreCuartel=${cuartel}`
    }),
    getStateConRango: builder.query({
      query: ({ start_date, end_date, cuartel }) => `/state?start_date=${start_date}&end_date=${end_date}&nombreCuartel=${cuartel}`
    }),
    getPredecirNPK: builder.query({
      query: ({ dia, cuartel }) => `/prediction/NPK?diasAPredecir=${dia}&nombreCuartel=${cuartel}`
    }),
    getPredecirHidrico: builder.query({
      query: ({ dia, cuartel }) => `/state/hidrico?cantidadDeDias=${dia}&nombreCuartel=${cuartel}`
    }),
    getAlertaHelada: builder.query({
      query: () => `/alertas/helada?receiver_emailParam=raulcuello.am@gmail.com`
    }),
    getRecomendacionFertilizante: builder.query({
      query: (cuartel) => `/recomendacion/fertilizante?nombreCuartel=${cuartel}`
    }),
  })
});

// Exporta los hooks de ambas APIs
export const { 
  useGetFechasLimiteQuery, 
  useGetStateNitrogenoQuery, 
  useGetStatePotasioQuery, 
  useGetStateFosforoQuery, 
  useGetStatePHQuery, 
  useGetStateHumedadQuery, 
  useGetStateTemperaturaQuery, 
  useGetStateConductividadQuery,
  useGetStateConRangoQuery,
  useGetPredecirNPKQuery,
  useGetPredecirHidricoQuery,
  useGetAlertaHeladaQuery,
  useGetRecomendacionFertilizanteQuery,
} = apiEstado;

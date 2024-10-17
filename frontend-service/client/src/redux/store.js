import { configureStore } from '@reduxjs/toolkit';
import { apiCuarteles } from '@services/apiSliceGestion';
import { apiEstado } from '@services/apiSliceModelos';

export const store = configureStore({
  reducer: {
    [apiCuarteles.reducerPath]: apiCuarteles.reducer,
    [apiEstado.reducerPath]: apiEstado.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiCuarteles.middleware, apiEstado.middleware),
});

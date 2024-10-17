import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API para el puerto 3000
export const apiCuarteles = createApi({
  reducerPath: 'apiCuarteles',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL_3000 }),
  endpoints: (builder) => ({
    getCuarteles: builder.query({
      query: () => '/cuarteles'
    }),
  }),
});

export const { useGetCuartelesQuery } = apiCuarteles;

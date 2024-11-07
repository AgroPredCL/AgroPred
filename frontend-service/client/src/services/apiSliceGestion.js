import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API para el puerto 3000
export const apiCuarteles = createApi({
  reducerPath: 'apiCuarteles',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL_3000 }),
  endpoints: (builder) => ({
    getCuarteles: builder.query({
      query: () => '/cuarteles'
    }),
    postCuartel: builder.mutation({
      query: (nuevoCuartel) => ({
        url: '/cuartel',
        method: 'POST',
        body: nuevoCuartel,
      }),
    }),
    putCuartel: builder.mutation({
      query: ({cuartel, changes}) => ({
        url: `cuartel/${cuartel}`,
        method: 'PUT',
        body: changes,
      }),
    }),

    getUsoRiego: builder.query({
      query: (cuartel) => `uso_riego/${cuartel}`
    }),
    postRiego: builder.mutation({
      query: (nuevoCuartel) => ({
        url: '/uso_riego',
        method: 'POST',
        body: nuevoCuartel,
      }),
    }),
    putRiego: builder.mutation({
      query: ({cuartel, changes}) => ({
        url: `/uso_riego/${cuartel}`,
        method: 'PUT',
        body: changes,
      }),
    }),
    
    getUsuarios: builder.query({
      query: () => 'http://localhost:3000/usuarios'
    }),
    postUsuarios: builder.mutation({
      query: (nuevoUser) => ({
        url: '/usuario',
        method: 'POST',
        body: nuevoUser,
      }),
    }),
    putUsuario: builder.mutation({
      query: ({rut, changes}) => ({
        url: `/usuario/${rut}`,
        method: 'PUT',
        body: changes,
      }),
    }),
    deleteUsuario: builder.mutation({
      query: (rut) => ({
        url: `/usuario/${rut}`,
        method: 'DELETE'
      }),
    }),
  }),
});

export const { useGetCuartelesQuery, usePostCuartelMutation, usePutCuartelMutation, useGetUsoRiegoQuery, usePostRiegoMutation, usePutRiegoMutation, useGetUsuariosQuery, usePostUsuariosMutation, usePutUsuarioMutation, useDeleteUsuarioMutation } = apiCuarteles;

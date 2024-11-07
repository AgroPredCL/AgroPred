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
      query: () => '/usuarios'
    }),
    postUsuarios: builder.mutation({
      query: (nuevoUser) => ({
        url: '/usuario',
        method: 'POST',
        body: nuevoUser,
      }),
    }),
    putUsuario: builder.mutation({
      query: ({ rut, changes }) => ({
        url: `usuario/${rut}`,  // Asegúrate de que la URL esté correcta
        method: 'PUT',
        body: changes,  // Solo los cambios
      }),
    }),
    deleteUsuario: builder.mutation({
      query: (rut) => ({
        url: `/usuario/${rut}`,
        method: 'DELETE'
      }),
    }),

    getContratistas: builder.query({
      query: () => '/contratistas'
    }),
    postContratistas: builder.mutation({
      query: (nuevoUser) => ({
        url: '/contratista',
        method: 'POST',
        body: nuevoUser,
      }),
    }),
    putContratistas: builder.mutation({
      query: ({ rut, changes }) => ({
        url: `contratista/${rut}`,  // Asegúrate de que la URL esté correcta
        method: 'PUT',
        body: changes,  // Solo los cambios
      }),
    }),
    deleteContratista: builder.mutation({
      query: (rut) => ({
        url: `/contratista/${rut}`,
        method: 'DELETE'
      }),
    }),
  }),
});

export const { useGetCuartelesQuery, usePostCuartelMutation, usePutCuartelMutation, useGetUsoRiegoQuery, usePostRiegoMutation, usePutRiegoMutation, useGetUsuariosQuery, usePostUsuariosMutation, usePutUsuarioMutation, useDeleteUsuarioMutation, useGetContratistasQuery, usePostContratistasMutation, usePutContratistasMutation, useDeleteContratistaMutation } = apiCuarteles;

// services/productsApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { ProductFormData } from '../componets/form/ProductForm';

export type ProductTags = { type: 'Product' };

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://back-app-minimarket.onrender.com/api',
    prepareHeaders: (headers) => {
        const token = Cookies.get('token');
        const refreshToken = Cookies.get('refreshToken');

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        if (refreshToken) {
            headers.set('refresh-token', refreshToken);
        }

        return headers;
    },
});

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery,
    tagTypes: ['Product'], // Define los tipos de etiquetas aquí
    endpoints: (builder) => ({
        getProducts: builder.query<{productos:ProductFormData[]}, void>({
            query: () => '/products',
            providesTags: ['Product'], // Usa la etiqueta definida
        }),
        addProduct: builder.mutation<void, ProductFormData>({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: product,
            }),
            invalidatesTags: ['Product'], // Usa la etiqueta definida
        }),
    }),
});

export const { useGetProductsQuery, useAddProductMutation } = productsApi;

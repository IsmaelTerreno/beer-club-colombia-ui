import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Stock } from "@/lib/features/app/stock.dto";
import { Order } from "@/lib/features/app/order.dto"; // API definition using a base URL and expected endpoints

// API definition using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "beerClubColombiaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }),
  endpoints: (builder) => ({
    getLastStock: builder.query<Stock, void>({
      query: () => `http://localhost:8000/api/v1/stock/current`,
    }),
    createOrder: builder.mutation<void, Order>({
      query: (order) => ({
        url: `http://localhost:8000/api/v1/order`,
        method: "POST",
        body: order,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLastStockQuery, useCreateOrderMutation } = api;

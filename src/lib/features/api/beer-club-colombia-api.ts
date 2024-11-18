import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Stock } from "@/lib/features/app/stock.dto";

// API definition using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "beerClubColombiaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }),
  endpoints: (builder) => ({
    getLastStock: builder.query<Stock, void>({
      query: () => `stock/current`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLastStockQuery } = api;
